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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcrypt');
const usersSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "a first name should be specified"]
    },
    lastName: {
        type: String,
        required: [true, "a last name should be specified"]
    },
    email: {
        type: String,
        required: [true, "an email  should be specified"],
        unique: [true, "an email should be unique"]
    },
    password: {
        type: String,
        required: [true, "a password should be specified"]
    },
    role: {
        type: String,
        enum: ['student', 'professor'],
        default: 'student',
        required: [true, "a role should be specified"]
    }
}, { timestamps: true });
// a function to call to encrypt the password before saving the user
usersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if(!(this.isModified('password'))){
            //     console.log('here');
            //     return next();
            // }
            const salt = yield bcrypt.genSalt(10);
            const hashedpass = yield bcrypt.hash(this.password, salt);
            this.password = hashedpass;
            console.log(this.password);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const Users = mongoose_1.default.model('Users', usersSchema);
exports.default = Users;
