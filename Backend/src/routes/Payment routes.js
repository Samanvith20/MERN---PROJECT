import express from "express"
import {  getAllOrders, stripePayment } from "../Controllers/Paymentcontroller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = express.Router();
router.route("/").post( verifyJWT,stripePayment)
router.route("/orders").get(verifyJWT, getAllOrders)
 export default router