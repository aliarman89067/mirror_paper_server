"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BoardSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    label: { type: String, require: true },
}, { timestamps: true });
BoardSchema.index({ label: 1 });
const BoardModel = (0, mongoose_1.model)("Board", BoardSchema);
exports.default = BoardModel;
