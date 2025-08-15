import { Schema, model } from "mongoose";

const GradeSchema = new Schema(
  {
    name: { type: String, require: true },
    label: { type: String, require: true },
  },
  { timestamps: true }
);

GradeSchema.index({ label: 1 });

const GradeModel = model("Grade", GradeSchema);
export default GradeModel;
