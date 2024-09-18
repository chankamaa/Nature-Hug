import React, { useContext } from 'react';
import './product.css';
import { product_list } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Product = ({ category, setCategory }) => {
  const { cartItems, addToCart } = useContext(StoreContext);

  return (
    <div className='product-text'>
      <h1>Shop All Plants</h1>
      <div className="product" id="product">
        <button onClick={() => setCategory('OUTDOOR')}>OUTDOOR</button>
        <button onClick={() => setCategory('INDOOR')}>INDOOR</button>
        <button onClick={() => setCategory('PET FRIENDLY')}>PET FRIENDLY</button>
        <button onClick={() => setCategory('OTHERS')}>OTHERS</button>

        <div className="product-list">
          {product_list.map((item, index) => (
            <div 
              key={index} 
              className="product-list-item"
            >
              <img
                className={category === item.category ? "active" : ""}
                src={item.image}
                alt={item.name}
              />
              <p>{item.name}</p>
              <h3>Rs. {item.price}</h3>
              {/* Check the quantity in cart */}
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Product;
