"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaperFieldsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    guestId: { type: String },
    boards: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Board" }],
    grades: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Grade" }],
    subjects: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Subject" }],
}, {
    timestamps: true,
});
PaperFieldsSchema.index({ userId: 1, guestId: 1 });
const PaperFieldsModel = (0, mongoose_1.model)("PaperFields", PaperFieldsSchema);
exports.default = PaperFieldsModel;
