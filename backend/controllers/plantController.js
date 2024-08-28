import PlantModel from "../models/plantModel.js";
import fs from "fs";

const addPlant = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const plant = new PlantModel({ 
        name: req.body.name,
        scientificName: req.body.scientificName,
        description: req.body.description,
        image: image_filename,
        price: req.body.price,
        countInStock: req.body.countInStock,
        category: req.body.category,
    })

    try {
        await plant.save();
        res.json({success: true, message: "Plant Added Successfully"})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: "Plant Addition Failed"})
       
    }
}
// all plant list
const listPlant = async (req, res) => {
    try {
        const plants = await PlantModel.find();
        res.json({success: true, date:plants})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: "Failed to fetch plant list"})
    }
}

export{addPlant, listPlant}