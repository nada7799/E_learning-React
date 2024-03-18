"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const app_1 = require("./app");
const cors_1 = __importDefault(require("cors"));
app_1.app.use((0, cors_1.default)());
mongoose_1.default.connect(config_1.config.mongo.url).then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
});
app_1.app.listen(config_1.config.server.port, () => {
    console.log("listening on port " + config_1.config.server.port);
});
