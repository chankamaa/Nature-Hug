import SupplierModel from "../Model/supplierModel.js";

// Get all suppliers 
const getAllSuppliers = async (req, res, next) => {
  let suppliers;
  try {
    suppliers = await SupplierModel.find();
  } catch (error) {
    console.log(error);
  }

  // If no suppliers found
  if (!suppliers) {
    return res.status(404).json({ message: "Suppliers not found" });
  }

  // Return all suppliers
  return res.status(200).json({ suppliers });
};

// Add a new supplier (POST method)
const addSupplier = async (req, res, next) => {
  const { ID, Suppliername, Description, Contactinfor, Product } = req.body;

  // Create new supplier
  const newSupplier = new SupplierModel({
    ID,
    Suppliername,
    Description,
    Contactinfor,
    Product,
  });

  try {
    await newSupplier.save();
  } catch (error) {
    return res.status(500).json({ message: "Error adding supplier", error });
  }

  return res.status(201).json({ newSupplier });
};

import Supplier from "../Model/supplierModel.js";

// Get supplier by ID
const getSupplierById = async (req, res, next) => {
  const supplierId = req.params.id;

  let supplier;
  try {
    supplier = await Supplier.findOne({ ID: supplierId }); // Assuming you're searching by ID field, not MongoDB _id
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving supplier", error });
  }

  // If supplier not found
  if (!supplier) {
    return res.status(404).json({ message: "Supplier not found" });
  }

  // Return supplier
  return res.status(200).json({ supplier });
};

// Update supplier details by ID
const updateSupplier = async (req, res) => {
  const supplierId = req.params.id;  // Extract supplier ID from request params
  const { Suppliername, Description, Contactinfor, Product } = req.body;  // Extract updated fields from request body

  let supplier;
  try {
    supplier = await Supplier.findOneAndUpdate(
      { ID: supplierId },  // Search based on ID field
      { Suppliername, Description, Contactinfor, Product },  // Update these fields
      { new: true, runValidators: true }  // Return the updated document and run validation
    );
  } catch (error) {
    return res.status(500).json({ message: 'Error updating supplier', error });
  }

  // If no supplier is found
  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  // Return the updated supplier
  return res.status(200).json({ message: 'Supplier updated successfully', supplier });
};


const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;  // Extract supplier ID from request params

  let supplier;
  try {
    supplier = await Supplier.findOneAndDelete({ ID: supplierId });  // Find and delete by custom ID field
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting supplier', error });
  }

  // If no supplier is found
  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  // Return success message
  return res.status(200).json({ message: 'Supplier deleted successfully', supplier });
};


export { getAllSuppliers, addSupplier,getSupplierById, updateSupplier, deleteSupplier};
