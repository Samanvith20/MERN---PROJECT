// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDb from "./Database/db.js";
import { Cart } from "./models/Cart.model.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Connect to the database
ConnectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// add CartItems to the database
app.post("/cart", async (req, res) => {
  try {
    const cartItem = req.body;
  const newItem = await Cart.create(cartItem);
res.status(201)
.json(
    { 
        success: true, 
        message: "Cart item added successfully", 
        data: newItem
    });
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ success: false, message: "Failed to add cart item", error: error.message });
  }
});

// Define a route handler function to get cart items by user email
const getCartItemsByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        //console.log(email);

        // Define the filter to find cart items by email
        const filter = { email: email };

        // Query the database to find cart items matching the filter
        const result = await Cart.find(filter)

        // Send the response with the found cart items
        res.status(200).json({ success: true, message: "Cart items found", data: result });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, message: "Failed to fetch cart items", error: error.message });
    }
};

// Register the route handler for the GET request to "/cart"
app.get("/cart", getCartItemsByEmail);

export default app;
