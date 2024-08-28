import mongoose from "mongoose";    

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scientificName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },

})
const Plant = mongoose.models.plant || mongoose.model("Plant", plantSchema);

export default Plant;