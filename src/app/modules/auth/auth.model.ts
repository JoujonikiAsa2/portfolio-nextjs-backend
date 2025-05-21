import { model, Schema } from "mongoose";
import { TUser } from "./aith.interface";

const authSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String
  },
})

export const User = model<TUser>('User',authSchema)