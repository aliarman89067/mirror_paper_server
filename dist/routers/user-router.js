"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const router = express_1.default.Router();
// Sign up
// Login
router.post("/sign-up", user_controller_1.registerUser);
router.post("/sign-in", user_controller_1.signinUser);
router.post("/google/sign-in", user_controller_1.oAuthLogin);
router.get("/", user_controller_1.getUser);
router.get("/paperfields", user_controller_1.getUserWithPaperFields);
router.post("/papers-setup", auth_middleware_1.authMiddelware, user_controller_1.papersSetup);
router.put("/update-profile", auth_middleware_1.authMiddelware, user_controller_1.updateProfile);
router.put("/save-paper", auth_middleware_1.authMiddelware, user_controller_1.savePaper);
router.get("/get-saved", auth_middleware_1.authMiddelware, user_controller_1.getSavedPapers);
router.post("/get-alarm", auth_middleware_1.authMiddelware, user_controller_1.getAlarmPapers);
// router.get("/check-paper-setup", authMiddelware, checkUserPaperSetup);
// router.post("/papers-skip", authMiddelware, paperSkip);
exports.default = router;
