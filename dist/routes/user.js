import express from "express";
import { DeleteUser, getAllUser, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
app.get("/", (req, res) => {
    res.send("API working ");
});
// route = /api/v1/user/new
app.post("/new", newUser);
// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUser);
// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, DeleteUser); // chaining coz routes are same
export default app;
