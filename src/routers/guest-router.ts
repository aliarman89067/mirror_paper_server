import express from "express";
import {
  createGuest,
  checkPaperSetup,
  papersSetup,
  paperSkip,
} from "../controllers/guest-controller";

const router = express.Router();

router.post("/create", createGuest);
router.get("/check-paper-setup/:guestId", checkPaperSetup);
router.post("/papers-setup/:guestId", papersSetup);
router.post("/papers-skip/:guestId", paperSkip);

export default router;
