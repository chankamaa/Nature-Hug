import PlantModel from "../models/plantModel.js";

// Function to handle adding a plant
const addPlant = async (req, res) => {
    const image_filename = req.file ? `${req.file.filename}` : null;

    const plant = new PlantModel({
        name: req.body.name,
        scientificName: req.body.scientificName,
        description: req.body.description,
        image: image_filename,
        price: req.body.price,
        countInStock: req.body.countInStock,
        category: req.body.category,
    });

    try {
        await plant.save();
        res.json({ success: true, message: "Plant Added Successfully" });
    } catch (error) {
        console.error('Error adding plant:', error);
        res.status(500).json({ success: false, message: "Plant Addition Failed" });
    }
};

// Function to handle listing all plants
const listPlant = async (req, res) => {
    try {
        const plants = await PlantModel.find({});
        res.json({ success: true, data: plants });
    } catch (error) {
        console.error('Error fetching plant list:', error);
        res.status(500).json({ success: false, message: "Failed to fetch plant list" });
    }
};

export { addPlant, listPlant };
