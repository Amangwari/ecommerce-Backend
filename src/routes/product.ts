import express from "express"
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getlatestPorducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// crete new product - /api/v1/new 
app.post("/new",adminOnly, singleUpload, newProduct);

// to search product / get all product with filter
app.get("/all", getAllProducts);

// to get latest added products - api/v1/product/latest
app.get("/latest", getlatestPorducts);

// to get all categories - api/v1/product/categories
app.get("/categories", getAllCategories);

// to get all products - api/v1/product/admin-products
app.get("/admin-poducts", adminOnly, getAdminProducts);

// update single product and delete also 
app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct)
export default app;


