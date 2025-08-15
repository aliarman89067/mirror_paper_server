"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GuestSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    image: {
        type: String,
        default: "https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg",
    },
});
const GuestModel = (0, mongoose_1.model)("guest", GuestSchema);
exports.default = GuestModel;
