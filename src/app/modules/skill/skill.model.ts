// src/models/blog.model.ts

import { Schema, model } from "mongoose";
import { TSkill } from "./skill.interface";

const skillSchema = new Schema<TSkill>(
  {
    id: { type: String },
    name: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

export const Skill = model<TSkill>("Skill", skillSchema);
