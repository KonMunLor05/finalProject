import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NotHaveImage from './image/notHave.png';
import API from './api';

function DetailProduct({ productID, onReturn }) {
  const [product, setProduct] = useState({});
  const [categoryID, setCategoryID] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (productID) {
      getProductID(productID);
    }
  }, [productID]);

  
  useEffect(() => {
    if (categoryID) {
      getCategory(categoryID);
    }
  }, [categoryID]);

  const getProductID = (ProductID) => {
    API.get(`/api/product/${ProductID}`)
      .then((response) => {
        const productData = response.data.data[0][0];
        setProduct(productData);
        setCategoryID(productData.CategoryID);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };

  const getCategory = (categoryID) => {
    console.log(categoryID);
    API.get(`/api/category/${categoryID}`)
      .then((response) => {
        setCategoryName(response.data.data[0][0].CategoryName);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  };

  return (
    <div className="storageboxDetail">
      <div className='product1'>
        <button onClick={onReturn} className='turnBack'>Return to Storage</button>
        {product.PicturePath ? (
          <img width="75%" src={`http://localhost:8080/${product.PicturePath}`} className='center' alt="Product" />
        ) : (
          <img width="75%" src={NotHaveImage}  className='center' alt="No Product" />
        )}
      </div>
      <div className="product2">
        <p>Product Name: {product.ProductName}</p>
        <p>Unit Price: {product.UnitPrice}$</p>
        <p>Category: {categoryName}</p>
        <p>Quantity Per Unit: {product.QuantityPerUnit}</p>
        <p>Units In Stock: {product.UnitsInStock}</p>
        {/* Add more product details here */}
      </div>
    </div>
  );
}

export default DetailProduct;
