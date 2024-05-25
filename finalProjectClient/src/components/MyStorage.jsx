import React from 'react'
import { useState,useEffect } from 'react'
import Axios from 'axios'

function MyStorage() {

  const [count, setCount] = useState(0);
  const [productList, setProductList] = useState([]);

  const getProduct = () => {
    console.log('Fetching product data...');
    Axios.get('http://localhost:8080/api/product')
      .then((response) => {
        console.log('Product data received:', response.data.data);
        setProductList(response.data.data); // Assuming response.data is an array of product objects
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    
    <div className="storagebox">
        {productList.map((product) => (
          <div key={product.ProductID} className="product">
            <p>{product.ProductName}</p>
            <p>${product.UnitPrice}</p>
            
          </div>
        ))}
    </div>
    
  )
}

export default MyStorage