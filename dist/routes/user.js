import express from "express";
import { newUser } from "../controllers/user.js";
const app = express.Router();
app.get("/", (req, res) => {
    res.send("API working ");
});
// route = /api/v1/user/new
app.post("/user/new", newUser);
export default app;
