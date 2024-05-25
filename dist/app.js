import express from 'express';
//  Importing routes
import userRotes from './routes/user.js';
const port = 4000;
const app = express();
app.get("/", (req, res) => {
    res.send("API Working");
});
// using routes
app.use("/api/v1", userRotes);
app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
