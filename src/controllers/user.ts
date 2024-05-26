import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { newUserRequestBody } from "../types/types.js";

export const newUser = async (
    // req: Request<{}, {}, newUserRequestBody>, as we import  (same as =>  newUserRequestBody  const { name, email, photo, gender, role, _id, dob } = req.body;) 
    req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        const { name, email, photo, gender, role, _id, dob } = req.body;

        const user = await User.create({ name, email, photo, gender, role, _id, dob })

        return res.status(200).json({
            success: true,
            message: `User created successfully ${user.name}`
        })
    } catch (error) {

    }
}   