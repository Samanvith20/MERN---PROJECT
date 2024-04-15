import express from "express"
import { Updatemenu, createMenuItem, deleteMenuItem, getAllMenuItems, singleMenuItems, uploadimage } from "../Controllers/Menucontroller.js"
import { upload } from "../middlewares/multer_middleware.js"
import { ApiResponse } from "../utils/apiResponse.js"
const router= express.Router()

// declare the routes
 router.route("/").get(getAllMenuItems)
 router.route("/create").post(createMenuItem)
 router.route("/update/:id").patch(Updatemenu)
 router.route("/delete/:id").delete(deleteMenuItem)
 router.route("/:id").get(singleMenuItems)
 router.route("/upload").post(upload.single("image"),uploadimage)

// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       const file = req.file;
//       if (!file) {
//         throw new ApiError(400, 'Image is missing');
//       }
      
//       // Upload the file to Cloudinary
//       const imageUrl = await uploadToCloudinary(file);
  
//       // Send response with the Cloudinary URL
//       return res.json(new ApiResponse(200, imageUrl, 'Image uploaded successfully'));
//     } catch (error) {
//       console.error('Error handling file upload:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  export default router