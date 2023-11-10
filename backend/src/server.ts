import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { schema } from './graphql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { User } from './models/user';
import http from 'http';
import 'dotenv/config';
import path from 'path';

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
  ],
});

(async () => {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user: any = jwt.decode(token.replace('Bearer ', ''));
        if (!user) {
          return { user: null };
        }
        const role =
          (await User.findByPk(user.id).then((user: any) => user.role)) || null;
        return { user: { ...user, role } };
      },
    })
  );

  app.listen({ port: process.env.PORT }, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
})();
