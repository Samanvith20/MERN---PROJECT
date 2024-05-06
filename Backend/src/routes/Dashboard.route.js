import express from "express"
import { Dashboardlayout } from "../Controllers/Dashboardcontroller.js"
const router= express.Router()
router.route("/").get(Dashboardlayout)
 export default router