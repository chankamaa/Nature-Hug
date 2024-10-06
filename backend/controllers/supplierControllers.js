import SupplierModel from "../models/supplierModel.js";

// Get all suppliers
const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await SupplierModel.find();
    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "No suppliers found" });
    }
    return res.status(200).json({ suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

// Add a new supplier (POST method)
const addSupplier = async (req, res, next) => {
  const { ID, Suppliername, Description, Contactinfor, Product } = req.body;

  try {
    const newSupplier = new SupplierModel({
      ID,
      Suppliername,
      Description,
      Contactinfor,
      Product,
    });

    await newSupplier.save();
    return res.status(201).json({ message: 'Supplier added successfully', newSupplier });
  } catch (error) {
    console.error('Error adding supplier:', error);
    return res.status(500).json({ message: 'Error adding supplier', error });
  }
};

// Get supplier by ID
const getSupplierById = async (req, res, next) => {
  const supplierId = req.params.id;

  try {
    const supplier = await SupplierModel.findOne({ ID: supplierId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    return res.status(200).json({ supplier });
  } catch (error) {
    console.error('Error retrieving supplier:', error);
    return res.status(500).json({ message: 'Error retrieving supplier', error });
  }
};

// Update supplier details by ID
const updateSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const { Suppliername, Description, Contactinfor, Product } = req.body;

  try {
    const updatedSupplier = await SupplierModel.findOneAndUpdate(
      { ID: supplierId },
      { Suppliername, Description, Contactinfor, Product },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    return res.status(200).json({ message: 'Supplier updated successfully', updatedSupplier });
  } catch (error) {
    console.error('Error updating supplier:', error);
    return res.status(500).json({ message: 'Error updating supplier', error });
  }
};

// Delete supplier by ID
const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;

  try {
    // Check if supplier exists before attempting to delete
    const supplier = await SupplierModel.findOne({ ID: supplierId });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Delete the supplier if found
    await SupplierModel.findOneAndDelete({ ID: supplierId });

    return res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    return res.status(500).json({ message: 'Error deleting supplier', error });
  }
};

export { getAllSuppliers, addSupplier, getSupplierById, updateSupplier, deleteSupplier };
