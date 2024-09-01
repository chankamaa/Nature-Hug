import mongoose from 'mongoose'






import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    itemsPrice : { type:Number, required:true, default:0 },
    deliveryPrice :{ type:Number, required :true, default:0 },
    totalPrice:{ type:Number, required:true, default:0 },
   
    
    orderItems : { type:Array, required:true, default:[] },
    firstName:{ type:String, required:true, default:"" },
    lastName:{ type:String, required:true, default:"" },
    telephoneNo:{ type:String, required:true, default:"" },
    address:{ type:String, required:true, default:"" },
    city:{ type:String, required:true, default:"" },
    street:{ type:String, required:true, default:"" },
    Zipcode:{ type:String, required:true, default:"" },
    country:{ type:String, required:true, default:"" }

},{timestamps :true});

const Order = mongoose.model("Order", OrderSchema);
export default Order;