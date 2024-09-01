import mongoose, { Types } from 'mongoose';

const SupplierSchema = new mongoose.Schema({

ID:{
    type: String,
    required: true, //validate
},

Suppliername:{
    type: String,
    required: true, //validate
},
Description:{
    type: String,
    required: true, //validate
},
Contactinfor:{
    type: Number,
    required: true, //validate
},
Product:{
    type: String, //data type
    required: true, //validate
}
})  