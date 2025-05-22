"use strict";
// src/models/blog.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
const mongoose_1 = require("mongoose");
const skillSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String },
    thumbnail: { type: String },
    skillType: { type: String }
}, { timestamps: true });
exports.Skill = (0, mongoose_1.model)("Skill", skillSchema);
