import React from 'react'
import './product.css'
import { product_list } from '../../assets/assets'


const Product = ({ category, setCategory }) => {
  return (
    <div className='product-text'>  
      <h1>Shop All Plant</h1>
    <div className="product" id="product">
      <button onClick={() => setCategory(item.category)}>OUTDOOR</button>
      <button onClick={() => setCategory(item.category)}>INDOOR</button>
      <button onClick={() => setCategory(item.category)}>PET FRIENDLY</button>
      <button onClick={() => setCategory(item.category)}>OTHERS</button>

      <div className="product-list">
        {product_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.category ? "all" : item.category)} 
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
              <button onClick={() => setCategory(item.category)}>Add to Cart</button>
              
            </div>

          )
        })}
      </div>
      <hr />
    </div>
    </div>
  )
}

export default Product
