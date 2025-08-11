import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoute from './routes/user'
import morgan from "morgan";

dotenv.config();

//initialize express server
const app = express();
const port = process.env.PORT || 3000;

//connect to database
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/users", userRoute);


//running server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

