import { Schema, model } from "mongoose";

const PaperFieldsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    guestId: { type: String },
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
    grades: [{ type: Schema.Types.ObjectId, ref: "Grade" }],
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  },
  {
    timestamps: true,
  }
);

PaperFieldsSchema.index({ userId: 1, guestId: 1 });

const PaperFieldsModel = model("PaperFields", PaperFieldsSchema);
export default PaperFieldsModel;
