import { Schema, model } from "mongoose";

const GuestSchema = new Schema({
  name: { type: String, require: true },
  image: {
    type: String,
    default:
      "https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg",
  },
});

const GuestModel = model("guest", GuestSchema);
export default GuestModel;
