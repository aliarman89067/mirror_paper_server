import express from "express";
import { authMiddelware } from "../middleware/auth-middleware";
import {
  getUserPaperFields,
  getGuestPaperFields,
} from "../controllers/paper-controller";

const router = express.Router();

router.get("/user/get-paper-fields", authMiddelware, getUserPaperFields);
router.get("/guest/get-paper-fields/:guestId", getGuestPaperFields);

export default router;
