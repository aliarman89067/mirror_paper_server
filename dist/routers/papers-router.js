"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const paper_controller_1 = require("../controllers/paper-controller");
const router = express_1.default.Router();
router.get("/get-board-grades", paper_controller_1.getBoardsAndGrades);
router.post("/get-subjects", paper_controller_1.getSubjects);
router.get("/user/get-paper-fields", auth_middleware_1.authMiddelware, paper_controller_1.getUserPaperFields);
// router.get("/guest/get-paper-fields/:guestId", getGuestPaperFields);
router.post("/user/get-papers", auth_middleware_1.authMiddelware, paper_controller_1.getPapers);
exports.default = router;
