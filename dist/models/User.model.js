"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isOAuth: { type: Boolean, require: true, default: false },
    image: {
        type: String,
        default: "https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg",
    },
    friends: [String],
    saved: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "paper" }],
    requestSends: [String],
    requestRecieved: [String],
}, {
    timestamps: true,
});
UserSchema.index({ email: 1 });
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.default = UserModel;
