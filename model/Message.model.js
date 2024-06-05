import { Schema, model } from "mongoose";
const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      text: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      default: "unseen",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = model("Message", messageSchema);
