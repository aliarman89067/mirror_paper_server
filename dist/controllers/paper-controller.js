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
exports.getPapers = exports.getUserPaperFields = exports.getSubjects = exports.getBoardsAndGrades = void 0;
const Board_model_1 = __importDefault(require("../models/Board.model"));
const grade_model_1 = __importDefault(require("../models/grade.model"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const paperFields_model_1 = __importDefault(require("../models/paperFields.model"));
const paper_model_1 = __importDefault(require("../models/paper.model"));
const getBoardsAndGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield Board_model_1.default.find();
        const grades = yield grade_model_1.default.find();
        res.status(200).json({ boards, grades });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getBoardsAndGrades = getBoardsAndGrades;
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grades } = req.body;
    try {
        const grade1 = grades[0];
        const grade2 = grades[1];
        let subjects = [];
        if (grade1) {
            const existingSubjects = yield subject_model_1.default.find({ grade: grade1.label });
            subjects.push(...existingSubjects);
        }
        if (grade2) {
            const existingSubjects = yield subject_model_1.default.find({ grade: grade2.label });
            subjects.push(...existingSubjects);
        }
        res.status(200).json(subjects);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getSubjects = getSubjects;
const getUserPaperFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const userPaperFields = yield paperFields_model_1.default.findOne({ userId })
            .populate("boards")
            .populate("grades")
            .populate("subjects");
        if (!userPaperFields) {
            res.status(404).json({ message: "User paper fields not exist" });
            return;
        }
        const firstBoard = yield Board_model_1.default.findById(userPaperFields.boards[0]);
        const firstGrade = yield grade_model_1.default.findById(userPaperFields.grades[0]);
        const firstSubject = yield subject_model_1.default.findById(userPaperFields.subjects[0]);
        const existingPapers = yield paper_model_1.default.find({
            board: firstBoard === null || firstBoard === void 0 ? void 0 : firstBoard.name,
            grade: firstGrade === null || firstGrade === void 0 ? void 0 : firstGrade.name,
            subject: firstSubject === null || firstSubject === void 0 ? void 0 : firstSubject.name,
            type: "Yearly",
            year: "2024",
        });
        res.status(200).json({
            boards: userPaperFields.boards,
            grades: userPaperFields.grades,
            subjects: userPaperFields.subjects,
            papers: existingPapers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getUserPaperFields = getUserPaperFields;
const getPapers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board, grade, subject, type, year } = req.body;
    try {
        const papers = yield paper_model_1.default.find({
            board,
            grade,
            subject,
            type,
            year,
        });
        res.status(200).json(papers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Something went wrong ${error}` });
    }
});
exports.getPapers = getPapers;
