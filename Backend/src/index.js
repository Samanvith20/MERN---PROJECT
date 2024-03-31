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
      // get carts using email
    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await Cart.find(query)
      res.send(result);
    });
 


// delete a cart
app.delete('/carts/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await Cart.deleteOne(query);
  res.send(result);
})

// update cart quantity
app.put('/carts/:id', async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const { quantity } = req.body;

  try {
    const result = await Cart.updateOne(
      { _id: itemId },
      { $set: { quantity: parseInt(quantity, 10) } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Quantity updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
export default app;
