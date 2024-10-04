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
        const savedPlant = await plant.save();
        res.status(201).json({ success: true, message: "Plant Added Successfully", data: savedPlant });
    } catch (error) {
        console.error('Error adding plant:', error);
        res.status(500).json({ success: false, message: "Plant Addition Failed", error: error.message });
    }
};

// Function to handle listing all plants
const listPlant = async (req, res) => {
    try {
        const plants = await PlantModel.find({});
        res.status(200).json({ success: true, data: plants });
    } catch (error) {
        console.error('Error fetching plant list:', error);
        res.status(500).json({ success: false, message: "Failed to fetch plant list", error: error.message });
    }
};

// Function to handle updating a plant
const updatePlant = async (req, res) => {
    const plantId = req.params.id;

    const updatedFields = {
        name: req.body.name,
        scientificName: req.body.scientificName,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        category: req.body.category,
    };

    if (req.file) {
        updatedFields.image = req.file.filename; // Update image if a new one is uploaded
    }

    try {
        const updatedPlant = await PlantModel.findByIdAndUpdate(plantId, updatedFields, { new: true });

        if (!updatedPlant) {
            return res.status(404).json({ success: false, message: "Plant not found" });
        }

        res.status(200).json({ success: true, message: "Plant Updated Successfully", data: updatedPlant });
    } catch (error) {
        console.error('Error updating plant:', error);
        res.status(500).json({ success: false, message: "Failed to update plant", error: error.message });
    }
};

// Function to handle deleting a plant
const deletePlant = async (req, res) => {
    const plantId = req.params.id;

    try {
        const plant = await PlantModel.findByIdAndDelete(plantId);

        if (!plant) {
            return res.status(404).json({ success: false, message: "Plant not found" });
        }

        res.status(200).json({ success: true, message: "Plant Deleted Successfully" });
    } catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({ success: false, message: "Failed to delete plant", error: error.message });
    }
};

export { addPlant, listPlant, updatePlant, deletePlant };
