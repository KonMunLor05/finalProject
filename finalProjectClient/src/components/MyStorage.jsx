import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NotHaveImage from './image/notHave.png';

function MyStorage({ setActiveDetail }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    Axios.get('http://localhost:8080/api/product')
      .then((response) => {
        setProductList(response.data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };

  const handleProductClick = (productID) => {
    setActiveDetail(productID);
  };

  return (
    <div className="storagebox">
      {productList.map((product) => (
        <div
          key={product.ProductID}
          className="product"
          onClick={() => handleProductClick(product.ProductID)}
        >
          {product.PicturePath ? (
            <img width="75%" src={`http://localhost:8080/${product.PicturePath}`} alt="Product" />
          ) : (
            <img width="75%" src={NotHaveImage} alt="No Product" />
          )}
          <p>{product.ProductName}</p>
          <p>${product.UnitPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default MyStorage;
