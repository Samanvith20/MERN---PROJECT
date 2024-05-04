import AsyncHandler from "../utils/asyncHandler.js";
import { Payment } from "../models/Paymentmodel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Cart } from "../models/Cart.model.js";

// make a Stripe Payment
export const stripePayment = AsyncHandler(async(req, res) => {
    try {
        const  payments  = req.body;
       
        // Ensure that payments object exists and has cartItems property
        if (!payments || !payments.cartItems) {
            throw new Error("Invalid request: payments or cartItems not found in request body");
        }

        const createPayment = await Payment.create(payments);
        
        // Extract cartItems from payments object
        const cartItems = payments.cartItems;

        // Create an array of ObjectIds from cartItems
        const objectId = mongoose.Types.ObjectId;
        const cartIds = cartItems.map((id) => new objectId(id));

        // Delete cart items
        const deleteCart = await Cart.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json(new ApiResponse(200, createPayment,deleteCart ));
    } catch (error) {
        console.error("Error while creating a payment:", error);
        res.status(500).json(new ApiError(500, "Payment Failed check your details and try again"));
    }
});

// Get Orders  for a Payment using the User Email
export const getAllOrders = AsyncHandler(async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const decodedemail = req.decoded.email;
    console.log(decodedemail);
    if (email !== decodedemail) {
      throw new ApiError(401, "Unauthorized request");
    }
    const query = { email: email };
    console.log(query);
    try {
      const getOrderDetails = await Payment.find(query).sort({ createdAt: -1 });
      console.log(getOrderDetails);
      res.status(201).json(new ApiResponse(201, "Order Details fetched Successfully", getOrderDetails));
    } catch (error) {
      console.error("Error while fetching order details :", error);
      res.status(500).json(new ApiError(500, "Order Failed check your details and try again"));
    }
  });