"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const router = express_1.default.Router();
router.get("/check-paper-setup", auth_middleware_1.authMiddelware, user_controller_1.checkUserPaperSetup);
router.post("/papers-setup", auth_middleware_1.authMiddelware, user_controller_1.papersSetup);
router.post("/papers-skip", auth_middleware_1.authMiddelware, user_controller_1.paperSkip);
exports.default = router;
