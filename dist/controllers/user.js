import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
// Create user 
export const newUser = TryCatch(async (
// req: Request<{}, {}, newUserRequestBody>, as we import  (same as =>  newUserRequestBody  const { name, email, photo, gender, role, _id, dob } = req.body;) 
req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await User.findById(_id);
    // console.log(name, email, photo, gender, _id, dob);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new ErrorHandler("Please add all feilds", 400));
    user = await User.create({ name, email, photo, gender, _id, dob: new Date(dob) });
    return res.status(200).json({
        success: true,
        message: `User created successfully ${user.name}`
    });
});
// Get all user 
export const getAllUser = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        message: "all users",
        users,
    });
});
// Get user 
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid id", 400));
    return res.status(201).json({
        success: true,
        user,
    });
});
// Delete user 
export const DeleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid id", 400));
    await user.deleteOne();
    return res.status(201).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
