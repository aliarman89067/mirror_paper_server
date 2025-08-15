import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    name: { type: String, require: true },
    label: { type: String, require: true },
  },
  { timestamps: true }
);

BoardSchema.index({ label: 1 });

const BoardModel = model("Board", BoardSchema);
export default BoardModel;
