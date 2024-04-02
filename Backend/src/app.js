import express from "express"
import cors from "cors"; 
import cookieParser from "cookie-parser"; 
 const app= express();

 

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import cartRouter from "../src/routes/Cart routes.js"

//Declare route
app.use("/api/v1/cart", cartRouter)


 export default app