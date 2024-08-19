import Employee from '../models/Employee.js';



export const getTotalSalaries = async (req, res) => {
    try {
      const total = await Employee.aggregate([
        { $group: { _id: null, total: { $sum: "$basicSalary" } } }
      ]);
      res.status(200).json({ total: total[0].total });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating total salaries', error });
    }
  };
  
  export const getTotalEPF = async (req, res) => {
    try {
      const total = await Employee.aggregate([
        { $group: { _id: null, total: { $sum: "$epf" } } }
      ]);
      res.status(200).json({ total: total[0].total });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating total EPF', error });
    }
  };
  
  export const getTotalETF = async (req, res) => {
    try {
      const total = await Employee.aggregate([
        { $group: { _id: null, total: { $sum: "$etf" } } }
      ]);
      res.status(200).json({ total: total[0].total });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating total ETF', error });
    }
  };
  