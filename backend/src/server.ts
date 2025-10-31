import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@as-integrations/express5";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {schema} from "./graphql";
import cors from "cors";
import jwt from "jsonwebtoken";
import {graphqlUploadExpress} from "graphql-upload-minimal";
import {User} from "./models/user";
import http from "http";
import "dotenv/config";
import path from "path";

const app = express();

app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 1}));
console.log(path.join(__dirname, "uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
        "/graphql",
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({req}) => {
                const token = req.headers.authorization || "";
                const tokenUser = jwt.decode(token.replace("Bearer ", "")) as { id: number } | null;
                if (!tokenUser) {
                    return {user: null};
                }
                const user = await User.findByPk(tokenUser.id);
                console.log(user);
                return {user};
            },
        }),
    );

    app.listen({port: process.env["PORT"]}, () => {
        console.log(`Listening on port ${process.env["PORT"]}`);
    });
})();
