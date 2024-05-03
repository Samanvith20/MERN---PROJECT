import express from "express"
import {  stripePayment } from "../Controllers/Paymentcontroller.js";
const router = express.Router();
router.route("/").post(stripePayment)
 export default router