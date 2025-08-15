import { Schema, model } from "mongoose";

const SubjectSchema = new Schema(
  {
    name: { type: String, require: true },
    grade: { type: String, require: true },
    label: { type: String, require: true },
  },
  { timestamps: true }
);

SubjectSchema.index({ label: 1 });

const SubjectModel = model("Subject", SubjectSchema);
export default SubjectModel;
