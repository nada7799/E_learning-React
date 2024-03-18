import { Router } from "express";
import {createUserController,updateUserController,deleteUserController} from '../Controllers/usersController';
export const userRouter =  Router();
userRouter.post('/create',createUserController);
userRouter.patch('/:id',updateUserController);
userRouter.delete('/:id',deleteUserController);
