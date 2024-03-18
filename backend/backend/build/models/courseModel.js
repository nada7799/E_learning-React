"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "a title should be specified"]
    },
    description: {
        type: String,
        optional: true
    },
    image: {
        type: String,
        optional: true
    },
    professor: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Users",
        required: [true, "a professor should be specified"]
    },
    students: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "Users",
        default: []
    },
}, { timestamps: true });
const Courses = mongoose_1.default.model('Courses', courseSchema);
exports.default = Courses;
