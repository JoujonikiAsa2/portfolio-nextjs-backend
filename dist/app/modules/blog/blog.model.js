"use strict";
// src/models/blog.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
    thumbnail: {
        type: String,
    }
}, { timestamps: true });
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
