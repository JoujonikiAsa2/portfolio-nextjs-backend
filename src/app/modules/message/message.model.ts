import { model, Schema } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      requred: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = model<TMessage>("Message", messageSchema);
