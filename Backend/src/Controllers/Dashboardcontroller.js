
import { Menu } from "../models/Menu.model.js";
import { User } from "../models/user.model.js";
import { Payment } from "../models/Paymentmodel.js";

import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const Dashboardlayout = AsyncHandler(async (req, res) => {
    try {
        //countDocuments() is used to retrieve the count of documents in different MongoDB collections.
        const user = await User.countDocuments();
        const menuItems = await Menu.countDocuments();
        const Orders = await Payment.countDocuments();
        //  aggregate() is used to perform more complex operations on the data, 
        const paymentPrice = await Payment.aggregate([{
            $group: {
                _id: null,  // means grouping all documents together
                totalRevenue: {
                    $sum: "$price"   // calculate the sum of a specified field 
                }
            }
        }]);
        const revenue = paymentPrice.length > 0 ? paymentPrice[0].totalRevenue : 0; 
        res.status(200).json({user,menuItems,Orders,revenue})
    } catch (error) {
        res.status(500).json(new ApiError(500, "Unable to find the dashboard information"));
    }
});

