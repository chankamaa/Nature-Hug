import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductItem.css';
import { jsPDF } from 'jspdf'; // Import jsPDF
import axios from 'axios'; // Import axios for API requests
import natureHugLogo from '../../../public/nature-hug-logo-base64'; // Import the base64-encoded image

const ProductItem = () => {
  const [plants, setPlants] = useState([]); // Local state for plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating to the edit page

  // Fetch all plants when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/plants'); // Adjust API URL as needed
        setPlants(response.data.data); // Assuming the response data is in `data`
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchPlants(); // Call the function to fetch plants
  }, []);

  // Handle delete product
  const handleDelete = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;

    try {
      await axios.delete(`http://localhost:4000/api/plants/delete/${productId}`); // Adjust API URL for delete
      // After deletion, fetch the updated product list
      const updatedPlants = plants.filter((product) => product._id !== productId);
      setPlants(updatedPlants); // Update the state after deletion
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product');
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    // Navigate to AddProductForm and pass product data for editing
    navigate(`/admin/add-product`, { state: { product } });
  };
  
  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    const logoWidth = 30;  // Adjust the width of the logo
    const logoHeight = 30; // Adjust the height of the logo

    doc.addImage(natureHugLogo, 'PNG', 10, 10, logoWidth, logoHeight); // Use base64 image data
    doc.setFontSize(18);
    doc.text('NATURE HUG', 50, 15); // Add company name
    doc.setFontSize(12);
    doc.text('Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.', 50, 25);
    doc.text('Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337', 50, 30);
    
    doc.setFontSize(15);
    doc.text("Product List", 10, 50);

    // Add a header row
    doc.setFontSize(12);
    doc.text('Name', 10, 60);
    doc.text('Price', 80, 60);
    doc.text('Category', 140, 60);

    // Add products data
    let yPos = 70;
    plants.forEach((product, index) => {
      doc.setFontSize(10);
      doc.text(product.name, 10, yPos);
      doc.text(`Rs. ${product.price}`, 80, yPos);
      doc.text(product.category || 'Uncategorized', 140, yPos);
      yPos += 10;
    });

    // Save the PDF
    doc.save('product_list.pdf');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!plants || plants.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className='mm34'>
      <h2>Product List</h2>
      <button onClick={downloadPDF}>Download PDF</button> {/* PDF Download Button */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th> {/* Add category column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:4000/images/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>{product.category}</td> {/* Display the auto-assigned category */}
              <td>
                <button onClick={() => handleEdit(product)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductItem;
