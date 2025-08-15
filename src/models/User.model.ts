import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isOAuth: { type: Boolean, require: true, default: false },
    image: {
      type: String,
      default:
        "https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg",
    },
    friends: [String],
    saved: [{ type: Schema.Types.ObjectId, ref: "paper" }],
    requestSends: [String],
    requestRecieved: [String],
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

const UserModel = model("user", UserSchema);
export default UserModel;
