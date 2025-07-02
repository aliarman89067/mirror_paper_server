import express from "express";
import { checkUserPaperSetup } from "../controllers/user-controller";

const router = express.Router();

router.get("/check-paper-setup/:userId", checkUserPaperSetup);

export default router;
