"use strict";
// src/models/blog.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    resume: {
        type: String,
    },
    image: { type: String },
}, { timestamps: true });
exports.Profile = (0, mongoose_1.model)("Profile", profileSchema);
