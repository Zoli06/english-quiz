"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_1 = require("@apollo/server");
var express4_1 = require("@apollo/server/express4");
var drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
var graphql_1 = require("./graphql");
var cors_1 = __importDefault(require("cors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var graphql_upload_minimal_1 = require("graphql-upload-minimal");
var user_1 = require("./models/user");
var http_1 = __importDefault(require("http"));
require("dotenv/config");
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use((0, graphql_upload_minimal_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 1 }));
console.log(path_1.default.join(__dirname, "uploads"));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
var httpServer = http_1.default.createServer(app);
var server = new server_1.ApolloServer({
    schema: graphql_1.schema,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({
            httpServer: httpServer,
        }),
    ],
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
                    context: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                        var token, user, role;
                        var req = _b.req;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    token = req.headers.authorization || "";
                                    user = jsonwebtoken_1.default.decode(token.replace("Bearer ", ""));
                                    if (!user) {
                                        return [2 /*return*/, { user: null }];
                                    }
                                    return [4 /*yield*/, user_1.User.findByPk(user.id).then(function (user) { return user.role; })];
                                case 1:
                                    role = (_c.sent()) || null;
                                    return [2 /*return*/, { user: __assign(__assign({}, user), { role: role }) }];
                            }
                        });
                    }); },
                }));
                app.listen({ port: process.env.PORT }, function () {
                    console.log("Listening on port ".concat(process.env.PORT));
                });
                return [2 /*return*/];
        }
    });
}); })();
