import express from "express";
import { authMiddelware } from "../middleware/auth-middleware";
import {
  getBoardsAndGrades,
  getSubjects,
  getUserPaperFields,
  getPapers,
} from "../controllers/paper-controller";

const router = express.Router();

router.get("/get-board-grades", getBoardsAndGrades);
router.post("/get-subjects", getSubjects);
router.get("/user/get-paper-fields", authMiddelware, getUserPaperFields);
// router.get("/guest/get-paper-fields/:guestId", getGuestPaperFields);
router.post("/user/get-papers", authMiddelware, getPapers);

export default router;
