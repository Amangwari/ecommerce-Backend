import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { newUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCath } from "../middlewares/error.js";
import { error } from "console";

export const newUser = TryCath(async (
    // req: Request<{}, {}, newUserRequestBody>, as we import  (same as =>  newUserRequestBody  const { name, email, photo, gender, role, _id, dob } = req.body;) 
    req: Request<{}, {}, newUserRequestBody>,
    res: Response,
    next: NextFunction) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    console.log(name, email, photo, gender, _id, dob);


    const user = await User.create({ name, email, photo, gender, _id, dob: new Date(dob) })

    return res.status(201).json({
        success: true,
        message: `User created successfully ${user.name}`
    })
}
)