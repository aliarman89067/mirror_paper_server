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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_js_1 = require("./lib/auth.js");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const setup_router_1 = __importDefault(require("./routers/setup-router"));
const user_router_1 = __importDefault(require("./routers/user-router"));
const papers_router_1 = __importDefault(require("./routers/papers-router"));
const guest_router_1 = __importDefault(require("./routers/guest-router"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_js_1.auth));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
}));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json());
app.use("/api/v1/user", user_router_1.default);
app.use("/api/v1/setup", setup_router_1.default);
app.use("/api/v1/papers", papers_router_1.default);
app.use("/api/v1/guest", guest_router_1.default);
const prisma = new client_1.PrismaClient();
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.guest.findMany();
    res.send(data);
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
