import { Cart } from "../models/Cart.model";


// get carts using email
 export const getCartByEmail = async(req, res) => {
    try {
        const email = req.query.email;
        // console.log(email);
        const query = {email: email};
        const result = await Cart.find(query).exec();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}