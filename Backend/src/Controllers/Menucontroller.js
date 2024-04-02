import { Menu } from "../models/Menu.model";
import { ApiResponse } from "../utils/apiResponse";
import AsyncHandler from "../utils/asyncHandler";
 export const getAllMenuItems=AsyncHandler(async(req,res)=>{
    try {
        const menus = await Menu.find({});
        res.status(200).json(new ApiResponse(200,menus,"fetched the menuItems Successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500,"Failed to get MenuItems"));
    }
 })