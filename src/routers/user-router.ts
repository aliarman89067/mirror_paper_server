import express from "express";
import {
  // checkUserPaperSetup,
  // paperSkip,
  updateProfile,
  registerUser,
  signinUser,
  oAuthLogin,
  getUser,
  papersSetup,
  getUserWithPaperFields,
  savePaper,
  getSavedPapers,
  getAlarmPapers,
} from "../controllers/user-controller";
import { authMiddelware } from "../middleware/auth-middleware";

const router = express.Router();

// Sign up
// Login
router.post("/sign-up", registerUser);
router.post("/sign-in", signinUser);
router.post("/google/sign-in", oAuthLogin);
router.get("/", getUser);
router.get("/paperfields", getUserWithPaperFields);
router.post("/papers-setup", authMiddelware, papersSetup);
router.put("/update-profile", authMiddelware, updateProfile);
router.put("/save-paper", authMiddelware, savePaper);
router.get("/get-saved", authMiddelware, getSavedPapers);
router.post("/get-alarm", authMiddelware, getAlarmPapers);

// router.get("/check-paper-setup", authMiddelware, checkUserPaperSetup);
// router.post("/papers-skip", authMiddelware, paperSkip);

export default router;
