"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaperSchema = new mongoose_1.Schema({
    board: { type: String, require: true },
    grade: { type: String, require: true },
    subject: { type: String, require: true },
    year: { type: String },
    topic: { type: String },
    type: { type: String, require: true },
    name: { type: String, require: true },
    url: { type: String, require: true },
    paperNo: { type: String, require: true },
    variantNo: { type: String, require: true },
});
const PaperModel = (0, mongoose_1.model)("paper", PaperSchema);
exports.default = PaperModel;
