import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { schema } from "./graphql.ts";
import cors from "cors";
import jwt from "jsonwebtoken";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { User } from "./feature/user/user.orm.ts";
import http from "http";
import "dotenv/config";
import path from "path";
import { config } from "./config.ts";

(async () => {
  const app = express();

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
  app.use(
    config.address.uploadEndpoint,
    express.static(config.uploadPath),
  );

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
    ],
  });
  await server.start();

  app.use(
    config.address.apiEndpoint,
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const tokenUser = jwt.decode(token.replace("Bearer ", "")) as {
          id: number;
        } | null;
        if (!tokenUser) {
          return { user: null };
        }
        const user = await User.findByPk(tokenUser.id);
        return { user };
      },
    }),
  );

  // Serve public folder on everything except /graphql and upload endpoint
  // We use React router for routing so we need to serve index.html for all routes
  app.use((req, res, next) => {
    if (
      req.path.startsWith(config.address.apiEndpoint) ||
      req.path.startsWith(config.address.uploadEndpoint)
    ) {
      return next();
    }
    // Check if it asks for file or path without extension
    if (path.extname(req.path).length > 0) {
      return res.sendFile(
        path.join(import.meta.dirname, "..", "public", req.path),
      );
    } else {
      return res.sendFile(
        path.join(import.meta.dirname, "..", "public", "index.html"),
      );
    }
  });

  app.listen({ port: config.address.port }, () => {
    console.log(`Listening on port ${config.address.port}`);
  });
})();
