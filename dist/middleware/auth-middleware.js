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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddelware = void 0;
const auth_1 = require("../lib/auth");
const node_1 = require("better-auth/node");
const authMiddelware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authData = yield auth_1.auth.api.getSession({
            headers: (0, node_1.fromNodeHeaders)(req.headers),
        });
        if (!authData) {
            res.status(401).json({ message: "Unauthorized user" });
            return;
        }
        req.user = {
            id: authData.user.id,
        };
        next();
    }
    catch (error) {
        console.log("Middleware Error", error);
        res.status(500).json({ message: `Middleware Error ${error}` });
    }
});
exports.authMiddelware = authMiddelware;
