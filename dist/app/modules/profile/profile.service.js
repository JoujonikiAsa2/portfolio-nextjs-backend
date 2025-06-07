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
exports.ProfileServices = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const profile_model_1 = require("./profile.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield profile_model_1.Profile.create(Object.assign({}, payload));
    return profile;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield profile_model_1.Profile.findOne({}).sort({ createdAt: -1 });
    return profiles;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield profile_model_1.Profile.findById(id);
    if (!profile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Profile not found.");
    }
    return profile;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProfile = yield profile_model_1.Profile.findById(id);
    if (!existingProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Profile not found.");
    }
    const updatedprofile = yield profile_model_1.Profile.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedprofile;
});
const deleteprofile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProfile = yield profile_model_1.Profile.findById(id);
    if (!existingProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Profile not found.");
    }
    yield profile_model_1.Profile.findByIdAndDelete(id);
    return null;
});
const downloadResumeClickedCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProfile = yield profile_model_1.Profile.findById(id);
    if (!existingProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Profile not found.");
    }
    const updatedCount = yield profile_model_1.Profile.findByIdAndUpdate(id, { clickedCount: (existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.clickedCount) + 1 }, {
        new: true,
    });
    return updatedCount;
});
exports.ProfileServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteprofile,
    downloadResumeClickedCount
};
