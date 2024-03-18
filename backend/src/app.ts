const express = require("express");
import { userRouter } from "./Routes/usersRouter";
import { courseRouter } from "./Routes/coursesRouter";
import { gradesRouter } from "./Routes/gradesRouter";
import { GlobalErrorHandler } from "./Controllers/globalErrorController";
import cors from 'cors';
require('express-async-errors');
export const  app = express();



app.use(express.json());
app.use(cors());
app.use('/users',userRouter);
app.use('/courses',courseRouter);
app.use('/grades',gradesRouter);
app.use(GlobalErrorHandler);