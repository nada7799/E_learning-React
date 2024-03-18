"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gradeSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Users",
        required: [true, "a student should be specified"]
    },
    course: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Courses",
        required: [true, "a course should be specified"]
    },
    grade: {
        type: Number,
        required: [true, "a grade should be specified"]
    },
    feedback: {
        type: String,
        optional: true
    },
}, { timestamps: true });
const Grade = mongoose_1.default.model('Grade', gradeSchema);
exports.default = Grade;
