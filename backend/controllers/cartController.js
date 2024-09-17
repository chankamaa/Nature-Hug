import userModel from '../models/userModel.js';

//add items to user cart

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne(req.body.userID);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemID]) {
            cartData[req.body.itemID] = 1;
        }
        else {
            cartData[req.body.itemID] += 1;
        }
        await userModel.findOneAndUpdate(req.body.userID, { cartData: cartData });
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}
//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userID);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemID]) {
            cartData[req.body.itemID] -= 1;

        }
        await userModel.findByIdAndUpdate(req.body.userID, { cartData: cartData });
        res.json({ success: true, message: "Removed from Cart" });
    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


//feth user cart data
const fetchCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userID);
        let cartData = await userData.cartData;
        res.json({success:true, cartData:cartData});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export { addToCart, removeFromCart, fetchCart }

