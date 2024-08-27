import { response } from 'express';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"


//placing user order for frontend

    try {
          const newOrderb = new orderModel({
            userID: req.body.userID,
            orderItems: req.body.orderItems,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrderb.save();
        await userModel .findByIdAndUpdate (req.body.userID, { cartData: {} });


        const line_items = req.body.orderItems.map((item)=> ({
            price_data: {
                currency: 'Rs',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))


        line_items.push({
            price_data: {
                currency: 'Rs',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 350,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verfiy?success=true&orderId=${newOrderb._id}`,
            cancel_url: `${frontend_url}/verfiy?success=false&orderId=${newOrderb._id}`,
            
        })
        res.json({ success: true, session_url: session.url });
      
    

    } catch (error) {

    }


}

export { placeOrder }