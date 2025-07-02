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
exports.paperSkip = exports.papersSetup = exports.checkUserPaperSetup = void 0;
const client_1 = require("@prisma/client");
const paper_fields_1 = require("../lib/paper-fields");
const prisma = new client_1.PrismaClient();
const checkUserPaperSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.user;
        const existingUser = yield prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                userPaperFields: true,
            },
        });
        if (!existingUser) {
            res.status(401).json({
                success: false,
                error: "USER_NOT_FOUND",
            });
            return;
        }
        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.userPaperFields) ||
            !((_a = existingUser === null || existingUser === void 0 ? void 0 : existingUser.userPaperFields[0]) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(200).json({ success: false, error: "SETUP_NOT_INITIALIZED" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User setup was succesfully initialized",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.checkUserPaperSetup = checkUserPaperSetup;
const papersSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { boards, grades, subjects } = req.body;
        if (!boards ||
            boards.length === 0 ||
            !grades ||
            grades.length === 0 ||
            !subjects ||
            subjects.length === 0) {
            res.status(400).json({ message: "Payload is not correct" });
            return;
        }
        let notValid = checkFieldsValidity(boards, grades, subjects);
        if (notValid) {
            res.status(400).json({ message: "Fields is not valid" });
            return;
        }
        yield prisma.userPaperFields.create({
            data: {
                userId,
                board: boards,
                grade: grades,
                subjects: subjects,
            },
        });
        res.status(201).json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.papersSetup = papersSetup;
const checkFieldsValidity = (boards, grades, subjects) => {
    let notValid = false;
    for (let i = 0; i < boards.length; i++) {
        const isValid = paper_fields_1.validBoards.includes(boards[i]);
        if (!isValid) {
            notValid = true;
            break;
        }
    }
    if (!notValid) {
        for (let i = 0; i < grades.length; i++) {
            const isValid = paper_fields_1.validGrades.includes(grades[i]);
            if (!isValid) {
                notValid = true;
                break;
            }
        }
    }
    if (!notValid) {
        for (let i = 0; i < subjects.length; i++) {
            const isValid = paper_fields_1.validSubjects.includes(subjects[i]);
            if (!isValid) {
                notValid = true;
                break;
            }
        }
    }
    return notValid;
};
const paperSkip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { boards, grades, subjects } = req.body;
    try {
        if (!boards ||
            boards.length === 0 ||
            !grades ||
            grades.length === 0 ||
            !subjects ||
            subjects.length === 0) {
            res.status(400).json({ message: "Payload is not correct" });
            return;
        }
        let notValid = checkFieldsValidity(boards, grades, subjects);
        if (notValid) {
            res.status(400).json({ message: "Fields is not valid" });
            return;
        }
        yield prisma.userPaperFields.create({
            data: {
                userId,
                board: boards,
                grade: grades,
                subjects: subjects,
            },
        });
        res.status(201).json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.paperSkip = paperSkip;
