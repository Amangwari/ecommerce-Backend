import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";



export const newProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, category, stock } = req.body;
    const photo = req.file;

    if (!name || !price || !stock || !category || !photo ) return next(new ErrorHandler("Please add all feilds", 400));


    await Product.create({
        name, price, stock, category: category.toLowerCase(), photo: photo?.path,
    })

    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
    })
})