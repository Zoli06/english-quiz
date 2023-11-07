import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { User } from './models/user';
import { fillWithTestData } from './test';

const app = express();
app.use(cors());
const server = new ApolloServer({
  schema, context: async ({ req }) => {
    const token = req.headers.authorization || '';
    console.log(token);
    const user: any = jwt.decode(token.replace('Bearer ', ''));
    console.log(user);
    if (!user) {
      return { user: null };
    }
    const role = await User.findByPk(user.id).then((user: any) => user.role) || null;
    console.log(role);
    return { user: { ...user, role } };
  }
});
(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  // await fillWithTestData();
})();

