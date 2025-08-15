"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlarmPapers = exports.getSavedPapers = exports.savePaper = exports.updateProfile = exports.getUserWithPaperFields = exports.papersSetup = exports.getUser = exports.oAuthLogin = exports.signinUser = exports.registerUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const paperFields_model_1 = __importDefault(require("../models/paperFields.model"));
const mongoose_1 = __importStar(require("mongoose"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const Board_model_1 = __importDefault(require("../models/Board.model"));
const grade_model_1 = __importDefault(require("../models/grade.model"));
const paper_model_1 = __importDefault(require("../models/paper.model"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isOAuth } = req.body;
    try {
        const isAlreadyExist = yield User_model_1.default.findOne({ email });
        if (isAlreadyExist) {
            console.log("Already Created");
            res.status(401).json({ code: "USER_ALREADY_EXIST" });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield User_model_1.default.create({
            name,
            email,
            password: hashPassword,
            isOAuth: false,
            saved: [],
        });
        const tokenPayload = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            isOAuth: false,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET);
        const _a = newUser.toObject(), { password: newUserPass } = _a, rest = __rest(_a, ["password"]);
        res.status(201).json({ token, data: rest });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.registerUser = registerUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { email, password } = req.body;
    try {
        const existingUser = yield User_model_1.default.findOne({
            email,
            isOAuth: false,
        }).populate("saved");
        if (existingUser) {
            const isPassOk = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isPassOk) {
                const tokenPayload = {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    image: existingUser.image,
                    isOAuth: false,
                };
                const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET);
                const _d = existingUser.toObject(), { password: newUserPass } = _d, rest = __rest(_d, ["password"]);
                const userPaperFields = yield paperFields_model_1.default.findOne({
                    userId: existingUser.id,
                })
                    .populate("boards")
                    .populate("grades")
                    .populate("subjects");
                const paperFields = {
                    boards: (_a = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.boards) !== null && _a !== void 0 ? _a : [],
                    grades: (_b = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.grades) !== null && _b !== void 0 ? _b : [],
                    subjects: (_c = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.subjects) !== null && _c !== void 0 ? _c : [],
                };
                const isAccountSetup = !!userPaperFields;
                res
                    .status(200)
                    .json(Object.assign({ token, data: rest, isAccountSetup }, paperFields));
            }
            else {
                res.status(401).json({ code: "USER_NOT_FOUND" });
            }
        }
        else {
            res.status(401).json({ code: "USER_NOT_FOUND" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.signinUser = signinUser;
const oAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, image } = req.body;
    try {
        let user = null;
        user = yield User_model_1.default.findOne({ email, isOAuth: true });
        let tokenPayload;
        let token;
        if (user) {
            tokenPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                isOAuth: true,
            };
        }
        else {
            user = yield User_model_1.default.create({
                name,
                email,
                image,
                saved: [],
            });
            tokenPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                isOAuth: true,
            };
        }
        token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET);
        const _a = user.toObject(), { password: userPass } = _a, rest = __rest(_a, ["password"]);
        const userPaperFields = yield paperFields_model_1.default.findOne({
            userId: user.id,
        });
        const isAccountSetup = !!userPaperFields;
        res.status(200).json({ token, data: rest, isAccountSetup });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.oAuthLogin = oAuthLogin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(404).json({ message: "Token not found." });
            return;
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userPaperFields = yield paperFields_model_1.default.findOne({ userId: data.id })
            .populate("boards")
            .populate("grades")
            .populate("subjects");
        const isAccountSetup = !!userPaperFields;
        const paperFields = {
            boards: (_b = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.boards) !== null && _b !== void 0 ? _b : [],
            grades: (_c = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.grades) !== null && _c !== void 0 ? _c : [],
            subjects: (_d = userPaperFields === null || userPaperFields === void 0 ? void 0 : userPaperFields.subjects) !== null && _d !== void 0 ? _d : [],
        };
        res.status(200).json({ data, isAccountSetup, paperFields });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getUser = getUser;
const papersSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boards, grades, subjects } = req.body;
    try {
        const userId = req.user.id;
        const formattedBoards = boards.map((item) => item._id);
        const formattedGrades = grades.map((item) => item._id);
        const formattedSubjects = subjects.map((item) => item._id);
        const newPaperSetup = new paperFields_model_1.default();
        newPaperSetup.userId = new mongoose_1.Types.ObjectId(userId);
        newPaperSetup.boards = formattedBoards;
        newPaperSetup.grades = formattedGrades;
        newPaperSetup.subjects = formattedSubjects;
        yield newPaperSetup.save();
        res.status(201).json({
            message: "User account setup successfully",
            boards,
            grades,
            subjects,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.papersSetup = papersSetup;
const getUserWithPaperFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.headers["authorization"]?.split(" ")[1];
        // if (!token) {
        //   res.status(404).json({ message: "Token not found." });
        //   return;
        // }
        // const data = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        // const userPaperFields = await PaperFieldsModel.findOne({ userId: data.id });
        // const isAccountSetup = !!userPaperFields;
        const boards = yield Board_model_1.default.find();
        const grades = yield grade_model_1.default.find();
        const subjects = yield subject_model_1.default.find();
        res.status(200).json({
            boards,
            grades,
            subjects,
        });
        // res.status(200).json({
        //   data,
        //   isAccountSetup,
        //   userPaperFields,
        //   boards,
        //   grades,
        //   subjects,
        // });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getUserWithPaperFields = getUserWithPaperFields;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, boards, grades, subjects } = req.body;
        const userId = req.user.id;
        const updatedUser = yield User_model_1.default.findByIdAndUpdate(userId, { name, image }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User is not exist!" });
            return;
        }
        yield paperFields_model_1.default.findOneAndUpdate({ userId }, { boards, grades, subjects });
        const tokenPayload = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
            isOAuth: updatedUser.isOAuth,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET);
        res.status(202).json({ token, user: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.updateProfile = updateProfile;
const savePaper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { paperId } = req.body;
        const existingUser = yield User_model_1.default.findById(userId);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isExist = existingUser.saved.includes(paperId);
        console.log(existingUser.saved);
        console.log(paperId);
        if (isExist) {
            yield User_model_1.default.findByIdAndUpdate(userId, { $pull: { saved: paperId } }, { new: true });
            res.status(200).json({ message: "Paper removed", status: "REMOVED" });
            return;
        }
        else {
            yield User_model_1.default.findByIdAndUpdate(userId, {
                $push: { saved: paperId },
            }, { new: true });
            res.status(200).json({ message: "Paper saved", status: "ADD" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.savePaper = savePaper;
const getSavedPapers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const existingUser = yield User_model_1.default.findById(userId).populate("saved");
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const papers = existingUser.saved.reverse();
        res.status(200).json(papers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getSavedPapers = getSavedPapers;
const getAlarmPapers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paperIds } = req.body;
        const paperObjectIds = paperIds.map((id) => new mongoose_1.default.Types.ObjectId(id));
        const papers = yield paper_model_1.default.find({ _id: { $in: paperObjectIds } });
        res.status(200).json(papers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getAlarmPapers = getAlarmPapers;
