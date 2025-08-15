"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    grade: { type: String, require: true },
    label: { type: String, require: true },
}, { timestamps: true });
SubjectSchema.index({ label: 1 });
const SubjectModel = (0, mongoose_1.model)("Subject", SubjectSchema);
exports.default = SubjectModel;
