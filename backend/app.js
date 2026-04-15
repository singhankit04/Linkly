import express from "express";
import urlRoutes from "./src/routes/urlRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/create", urlRoutes)
app.use("/", urlRoutes)

export default app;