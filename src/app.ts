import express from 'express'

// tsc
// node ./dist/app

// npm run watch  -> for typescript
// nodemon start => npm run dev


//  Importing routes
import userRotes from './routes/user.js'
import { connectDB } from './utils/features.js';
import { ErrorMiddleware } from './middlewares/error.js';

const port = 4000;

connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Working")
})

// using routes
app.use("/api/v1/user", userRotes)


//middleware for error handling  (next means jump to next middleware)
app.use(ErrorMiddleware)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);

})