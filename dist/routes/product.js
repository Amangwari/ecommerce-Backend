import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getAdminProducts, getAllCategories, getlatestPorducts, newProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
// crete new product - /api/v1/new 
app.post("/new", adminOnly, singleUpload, newProduct);
// to get latest added products - api/v1/product/latest
app.get("/latest", getlatestPorducts);
// to get all categories - api/v1/product/categories
app.get("/categories", getAllCategories);
// to get all products - api/v1/product/admin-products
app.get("/admin-poducts", getAdminProducts);
export default app;
