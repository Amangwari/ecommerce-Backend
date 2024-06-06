import { User } from "../models/user.js";
export const newUser = async (
// req: Request<{}, {}, newUserRequestBody>, as we import  (same as =>  newUserRequestBody  const { name, email, photo, gender, role, _id, dob } = req.body;) 
req, res, next) => {
    try {
        const { name, email, photo, gender, _id, dob } = req.body;
        console.log(name, email, photo, gender, _id, dob);
        const user = await User.create({ name, email, photo, gender, _id, dob: new Date(dob) });
        return res.status(201).json({
            success: true,
            message: `User created successfully ${user.name}`
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};
