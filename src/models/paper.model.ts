import { Schema, model } from "mongoose";

const PaperSchema = new Schema({
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
const PaperModel = model("paper", PaperSchema);
export default PaperModel;
