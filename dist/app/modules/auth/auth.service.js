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
exports.AuthServices = void 0;
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
const auth_model_1 = require("./auth.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(auth_model_1.User.db.collections);
    const userData = yield auth_model_1.User.findOne({
        email: payload.email,
    });
    console.log(userData);
    if (userData === null) {
        throw new Error("No user found");
    }
    const isPasswordMatched = payload.password === userData.password;
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, "047dsfcdghfdkgj");
    }
    catch (error) {
        throw new Error("You are not authorized!");
    }
    const userData = yield auth_model_1.User.findOne({
        email: decodedData.email,
    });
    if (userData === null) {
        throw new Error("No user found");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    return {
        accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const userData = yield auth_model_1.User.findOne({
        email: user.email,
    });
    if (!userData) {
        throw new Error("User not found");
    }
    const isPasswordMatched = payload.password === userData.password;
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    yield auth_model_1.User.findOneAndUpdate({ email: payload.email }, { password: payload.password }, { new: true });
    return { message: "Password changed successfully!" };
});
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield auth_model_1.User.findOne({
        email: payload.email,
    });
    const resetPasswordToken = yield jwtHelpers_1.jwtHelpers.generateToken({
        email: userData === null || userData === void 0 ? void 0 : userData.email,
        role: userData === null || userData === void 0 ? void 0 : userData.role,
    }, config_1.default.jwt.reset_token_secret, config_1.default.jwt.reset_token_expires_in);
    const resetPasswordLink = `${config_1.default.reset_password_url}?id=${userData === null || userData === void 0 ? void 0 : userData.id}&token=${resetPasswordToken}`;
    console.log(resetPasswordLink);
    yield (0, sendEmail_1.default)(userData === null || userData === void 0 ? void 0 : userData.email, `
    <div>
    <p>Dear,</p>
      <p>Your reset password Link
      <a href="${resetPasswordLink}">
      <button>Reset Password</button></a>
      </p>
    </div>
    `);
    return { message: "Reset password link send to email" };
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield auth_model_1.User.findOne({
        email: payload.email,
    });
    if (userData === null) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid User");
    }
    const isValidToken = yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_token_secret);
    if (!isValidToken) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid token");
    }
    const isPasswordMatched = payload.password === userData.password;
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    yield auth_model_1.User.findOneAndUpdate({ email: payload.email }, { password: payload.password }, { new: true });
});
exports.AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
