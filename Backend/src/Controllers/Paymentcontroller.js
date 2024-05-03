import AsyncHandler from "../utils/asyncHandler.js";
import { Payment } from "../models/Paymentmodel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Cart } from "../models/Cart.model.js";

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

        res.status(201).json(new ApiResponse(201, createPayment,deleteCart ));
    } catch (error) {
        console.error("Error while creating a payment:", error);
        res.status(500).json(new ApiError(500, "Payment Failed check your details and try again"));
    }
});
