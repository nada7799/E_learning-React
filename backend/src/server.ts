import mongoose from "mongoose";
import { config } from "./config/config";
import {app} from "./app";
import express from 'express';
import cors from 'cors';
app.use(cors());
mongoose.connect(config.mongo.url).then(()=>
{
    console.log("connected");
}
).catch((error)=>{
    console.log(error);
});

app.listen(config.server.port,() =>{
    console.log("listening on port "+ config.server.port);
});
