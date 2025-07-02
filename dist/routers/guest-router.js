"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guest_controller_1 = require("../controllers/guest-controller");
const router = express_1.default.Router();
router.post("/create", guest_controller_1.createGuest);
router.get("/check-paper-setup/:guestId", guest_controller_1.checkPaperSetup);
router.post("/papers-setup/:guestId", guest_controller_1.papersSetup);
router.post("/papers-skip/:guestId", guest_controller_1.paperSkip);
exports.default = router;
