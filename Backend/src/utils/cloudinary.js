
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Example upload function
 export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    // return result.secure_url;    
    fs.unlinkSync(file)
        return result
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};