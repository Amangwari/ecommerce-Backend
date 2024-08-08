import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, category, stock } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("Please add photo", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log("Photo Deleted");
        });
        return next(new ErrorHandler("Please add all feilds", 400));
    }
    await Product.create({
        name, price, stock, category: category.toLowerCase(), photo: photo?.path,
    });
    return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
    });
});
export const getlatestPorducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
        success: true,
        products
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category");
    return res.status(200).json({
        success: true,
        categories
    });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({});
    return res.status(200).json({
        success: true,
        products
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Invalid product Id", 404));
    return res.status(200).json({
        success: true,
        product
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, stock } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler("Invalid product Id", 404));
    if (photo) {
        rm(product.photo, () => {
            console.log("Old Photo Deleted");
        });
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (category)
        product.category = category;
    if (stock)
        product.stock = stock;
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product updated Successfully",
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Invalid product Id", 404));
    rm(product.photo, () => {
        console.log("Product photo Deleted");
    });
    await Product.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    });
});
