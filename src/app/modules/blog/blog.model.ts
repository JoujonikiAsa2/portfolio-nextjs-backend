// src/models/blog.model.ts

import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
  authorname: {
    type: String,
    required: true,
    trim: true,
  },
  blogtitle: {
    type: String,
    required: true,
    trim: true,
  },
  publicationdate: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  }
}, { timestamps: true });

export const Blog = model<TBlog>('Blog', blogSchema);
