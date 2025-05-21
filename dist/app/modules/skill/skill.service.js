"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillServices = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const skill_model_1 = require("./skill.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.create(Object.assign({}, payload));
    return skill;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield skill_model_1.Skill.find({});
    return skills;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findById(id);
    if (!skill) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "skill not found.");
    }
    return skill;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingskill = yield skill_model_1.Skill.findById(id);
    if (!existingskill) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "skill not found.");
    }
    const updatedskill = yield skill_model_1.Skill.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedskill;
});
const deleteSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingskill = yield skill_model_1.Skill.findById(id);
    if (!existingskill) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "skill not found.");
    }
    yield skill_model_1.Skill.findByIdAndDelete(id);
    return null;
});
exports.SkillServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteSkill,
};
