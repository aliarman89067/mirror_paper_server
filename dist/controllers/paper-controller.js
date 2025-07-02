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
exports.getGuestPaperFields = exports.getUserPaperFields = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserPaperFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                userPaperFields: true,
            },
        });
        if (!existingUser || !existingUser.userPaperFields) {
            res.status(400).json({ message: "User or User paper fields not found" });
            return;
        }
        res.status(200).json({ data: existingUser.userPaperFields });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getUserPaperFields = getUserPaperFields;
const getGuestPaperFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guestId } = req.params;
    try {
        const existingGuest = yield prisma.guest.findUnique({
            where: {
                id: guestId,
            },
            include: {
                userPaperFields: true,
            },
        });
        if (!existingGuest || !existingGuest.userPaperFields) {
            res.status(400).json({ message: "Guest or User paper fields not found" });
            return;
        }
        res.status(200).json({ data: existingGuest.userPaperFields });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getGuestPaperFields = getGuestPaperFields;
