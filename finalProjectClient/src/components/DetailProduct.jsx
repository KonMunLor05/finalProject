import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NotHaveImage from './image/notHave.png';

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
    Axios.get(`http://localhost:8080/api/product/${ProductID}`)
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
    console.log(`http://localhost:8080/api/category/${categoryID}`);
    Axios.get(`http://localhost:8080/api/category/${categoryID}`)
      .then((response) => {
        setCategoryName(response.data.data[0][0].CategoryName);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  };

  return (
    <div className="storageboxDetail">
      <button onClick={onReturn}>Return to Storage</button>
      <div className="product">
        {product.PicturePath ? (
          <img width="75%" src={`http://localhost:8080/${product.PicturePath}`} alt="Product" />
        ) : (
          <img width="75%" src={NotHaveImage} alt="No Product" />
        )}
        <p>{product.ProductName}</p>
        <p>${product.UnitPrice}</p>
        <p>Category: {categoryName}</p>
        <p>Quantity Per Unit: {product.QuantityPerUnit}</p>
        <p>Units In Stock: {product.UnitsInStock}</p>
        {/* Add more product details here */}
      </div>
    </div>
  );
}

export default DetailProduct;
