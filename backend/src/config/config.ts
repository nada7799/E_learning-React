import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({path : "src/.env"})
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@acmtask3.o3dn786.mongodb.net/E-learning?retryWrites=true&w=majority`;
const SERVER_PORT= process.env.SERVER_PORT || 3000;
export const config = {
    mongo : {
        url :MONGO_URL
    },
    server :{
        port :SERVER_PORT
    }
}