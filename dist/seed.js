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
const mongoose_1 = __importDefault(require("mongoose"));
const subject_model_1 = __importDefault(require("./models/subject.model"));
require("dotenv/config");
const boards = [
    {
        title: "Cambridge",
        label: "cambridge",
    },
];
const grades = [
    {
        title: "A Level",
        label: "a-level",
    },
    {
        title: "O Level",
        label: "o-level",
    },
];
const subjects = [
    {
        name: "Mathematics",
        label: "mathematics",
        grade: "o-level",
    },
    {
        name: "Mathematics Additional",
        label: "mathematics-additional",
        grade: "o-level",
    },
    {
        name: "Physics",
        label: "physics",
        grade: "o-level",
    },
    {
        name: "Chemistry",
        label: "chemistry",
        grade: "o-level",
    },
    {
        name: "Biology",
        label: "biology",
        grade: "o-level",
    },
    {
        name: "Computer Science",
        label: "computer-science",
        grade: "o-level",
    },
    {
        name: "Economics",
        label: "economics",
        grade: "o-level",
    },
    {
        name: "Business Studies",
        label: "business-studies",
        grade: "o-level",
    },
    {
        name: "Accounting",
        label: "accounting",
        grade: "o-level",
    },
    {
        name: "Principles of Accounts",
        label: "principles-of-accounts",
        grade: "o-level",
    },
    {
        name: "English Language",
        label: "english-language",
        grade: "o-level",
    },
    {
        name: "Literature in English",
        label: "literature-in-english",
        grade: "o-level",
    },
    {
        name: "Geography",
        label: "geography",
        grade: "o-level",
    },
    {
        name: "History",
        label: "history",
        grade: "o-level",
    },
    {
        name: "Environmental Management",
        label: "environmental-management",
        grade: "o-level",
    },
    {
        name: "Islamiyat",
        label: "islamiyat",
        grade: "o-level",
    },
    {
        name: "Pakistan Studies",
        label: "pakistan-studies",
        grade: "o-level",
    },
    {
        name: "Sociology",
        label: "sociology",
        grade: "o-level",
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting Database");
        mongoose_1.default.connect(process.env.MONGO_URI).then(() => __awaiter(void 0, void 0, void 0, function* () {
            ``;
            // console.log("Starting Boards");
            // boards.map(async (item) => {
            //   await BoardModel.create({
            //     name: item.title,
            //     label: item.label,
            //   });
            // });
            // console.log("Starting Grades");
            // grades.map(async (item) => {
            //   await GradeModel.create({
            //     name: item.title,
            //     label: item.label,
            //   });
            // });
            console.log("Starting Subjects");
            subjects.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                yield subject_model_1.default.create({
                    name: item.name,
                    label: item.label,
                    grade: item.grade,
                });
            }));
            console.log("Seed Compeleted");
        }));
    }
    catch (error) {
        console.log(error);
    }
});
seed();
