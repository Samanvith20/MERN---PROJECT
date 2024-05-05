import express from "express"
import {  GetAllPayments, UpdatePayment, getAllOrders, stripePayment } from "../Controllers/Paymentcontroller.js";
import { verifyJWT } from "../middlewares/auth_middleware.js";
const router = express.Router();
router.route("/").post( verifyJWT,stripePayment)
router.route("/orders").get(verifyJWT, getAllOrders)
router.route("/all").get(verifyJWT,GetAllPayments)
router.route("/:id").patch(UpdatePayment)
 export default router