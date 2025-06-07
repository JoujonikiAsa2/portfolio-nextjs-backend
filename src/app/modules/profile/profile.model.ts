// src/models/blog.model.ts

import { Schema, model } from "mongoose";
import { TProfile } from "./profile.interface";

const profileSchema = new Schema<TProfile>(
  {
    resume: {
      type: String,
    },
    thumbnail: { type: String },
    clickedCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Profile = model<TProfile>("Profile", profileSchema);
