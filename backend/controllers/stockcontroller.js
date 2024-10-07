import Stoks from '../models/Stock.js';

// Get all stocks
export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stoks.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new stock
export const addStock = async (req, res) => {
  const { Product_ID, Product_name, Price, Qty, Total_Amount } = req.body;

  const newStock = new Stoks({
    Product_ID,
    Product_name,
    Price,
    Qty,
    Total_Amount,
  });

  try {
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a stock
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { Product_ID, Product_name, Price, Qty, Total_Amount } = req.body;

  try {
    const updatedStock = await Stoks.findByIdAndUpdate(id, {
      Product_ID,
      Product_name,
      Price,
      Qty,
      Total_Amount,
    }, { new: true });

    if (!updatedStock) return res.status(404).json({ message: 'Stock not found' });

    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a stock
export const deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stoks.findByIdAndDelete(id);

    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stock levels summary
export const getStockLevels = async (req, res) => {
  try {
    const stocks = await Stoks.find();

    // Define thresholds for stock levels
    const inStockThreshold = 5; // Define your in-stock threshold here
    const lowStockThreshold = 2; // Define your low-stock threshold here

    let inStockCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    // Calculate stock levels
    stocks.forEach(stock => {
      if (stock.Qty > 0) {
        // If the stock quantity is greater than 0, count it as in stock
        inStockCount++;

        // Also count it as low stock if it's below the in-stock threshold
        if (stock.Qty > 0 && stock.Qty <= inStockThreshold) {
          lowStockCount++;
        }
      } else {
        outOfStockCount++;
      }
    });

    // Return stock levels summary
    res.status(200).json({
      inStock: inStockCount,   // Includes low-stock items
      lowStock: lowStockCount, // Counts separately
      outOfStock: outOfStockCount,
      total: stocks.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
