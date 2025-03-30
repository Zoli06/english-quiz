"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.Role = void 0;
var graphql_shield_1 = require("graphql-shield");
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Editor"] = "editor";
})(Role || (exports.Role = Role = {}));
var isAdmin = (0, graphql_shield_1.rule)({ cache: "contextual" })(function (_parent, _args, ctx, _info) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ctx.user !== null && ctx.user.role === Role.Admin];
    });
}); });
var isEditor = (0, graphql_shield_1.rule)({ cache: "contextual" })(function (_parent, _args, ctx, _info) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ctx.user !== null && ctx.user.role === Role.Editor];
    });
}); });
var isSubmittingAttempt = (0, graphql_shield_1.rule)({ cache: "contextual" })(function (_parent, _args, _ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (info.operation.operation === "mutation" &&
                info.operation.name.value === "SubmitAttempt")];
    });
}); });
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        "*": graphql_shield_1.allow,
    },
    Mutation: {
        "*": (0, graphql_shield_1.or)(isAdmin, isEditor),
        submitAttempt: graphql_shield_1.allow,
    },
    Quiz: {
        "*": graphql_shield_1.allow,
    },
    Question: {
        "*": graphql_shield_1.allow,
        answers: (0, graphql_shield_1.or)(isAdmin, isEditor),
    },
    Option: {
        "*": graphql_shield_1.allow,
        isCorrect: (0, graphql_shield_1.or)(isAdmin, isEditor, isSubmittingAttempt),
    },
    Attempt: {
        "*": graphql_shield_1.allow,
    },
    Media: {
        "*": graphql_shield_1.allow,
    },
    SubmitAttempt: {
        "*": graphql_shield_1.allow,
    },
}, {
    // TODO: disable debug in production
    debug: true,
    fallbackRule: (0, graphql_shield_1.rule)({ cache: "contextual" })(function (info) {
        console.error("No rule defined");
        console.error(info);
        return false;
    }),
});
