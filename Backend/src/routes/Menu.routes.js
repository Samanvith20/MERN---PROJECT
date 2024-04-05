import express from "express"
import { Updatemenu, createMenuItem, deleteMenuItem, getAllMenuItems, singleMenuItems } from "../Controllers/Menucontroller.js"
const router= express.Router()

// declare the routes
 router.route("/").get(getAllMenuItems)
 router.route("/create").post(createMenuItem)
 router.route("/update/:id").patch(Updatemenu)
 router.route("/delete/:id").delete(deleteMenuItem)
 router.route("/:id").get(singleMenuItems)
  export default router