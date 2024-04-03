import express from "express"
import { createUser, deleteUser, getAdmin, getUser, makeUserAdmin } from "../Controllers/Usercontroller.js"

 const router= express.Router()

 // declare routes
 router.route("/").get(getUser)
 router.route("/create").post(createUser)
router.route("/delete/:id").delete(deleteUser)
router.route("/admin/email").get(getAdmin);

router.route("/update/:id").patch(makeUserAdmin)
 export default router