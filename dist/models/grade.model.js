"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GradeSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    label: { type: String, require: true },
}, { timestamps: true });
GradeSchema.index({ label: 1 });
const GradeModel = (0, mongoose_1.model)("Grade", GradeSchema);
exports.default = GradeModel;
