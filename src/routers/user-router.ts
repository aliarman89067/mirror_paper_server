import express from "express";
import {
  checkUserPaperSetup,
  papersSetup,
  paperSkip,
} from "../controllers/user-controller";
import { authMiddelware } from "../middleware/auth-middleware";

const router = express.Router();

router.get("/check-paper-setup", authMiddelware, checkUserPaperSetup);
router.post("/papers-setup", authMiddelware, papersSetup);
router.post("/papers-skip", authMiddelware, paperSkip);

export default router;
