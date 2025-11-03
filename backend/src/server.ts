import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@as-integrations/express5";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {schema} from "./graphql.ts";
import cors from "cors";
import jwt from "jsonwebtoken";
import {graphqlUploadExpress} from "graphql-upload-minimal";
import {User} from "./models/user/user.orm.ts";
import http from "http";
import "dotenv/config";
import path from "path";

const app = express();

app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 1}));
if (!process.env["UPLOAD_PATH"]) {
    process.env["UPLOAD_PATH"] = path.join(import.meta.dirname, "..", "uploads");
    console.error("UPLOAD_PATH is not set, using default");
}
console.info("Upload folder: " + process.env["UPLOAD_PATH"]);
app.use("/uploads", express.static(process.env["UPLOAD_PATH"]));

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
