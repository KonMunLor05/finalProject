import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import API from './api';

const UpdateProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    ProductID: '',
    ProductName: '',
    SupplierID: '',
    CategoryID: '',
    QuantityPerUnit: '',
    UnitPrice: '',
    UnitsInStock: '',
    UnitsOnOrder: '',
    ReorderLevel: '',
    Discontinued: '',
    UserID: ''
  });
  const [productList, setProductList] = useState([]);
  const storedUID = sessionStorage.getItem('userID');

  useEffect(() => {
    getProductUser(storedUID);
  }, [storedUID]);

  const getProductUser = (UID) => {
    API.get(`/api/product/User/${UID}`)
      .then((response) => {
        setProductList(response.data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append('productImage', selectedFile);

    for (const key in productDetails) {
      formData.append(key, productDetails[key]);
    }

    API.put(`/api/product/${productDetails.ProductID}`, formData)
      .then((response) => {
        console.log('Product update successfully:', response.data);
        window.alert('Product updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        window.alert('Error updating!');
      });
  };

  const handleProductSelect = (event) => {
    const selectedProductID = event.target.value;
    const selectedProduct = productList.find(product => product.ProductID === parseInt(selectedProductID));
    if (selectedProduct) {
      setProductDetails({
        ProductID: selectedProduct.ProductID,
        ProductName: selectedProduct.ProductName,
        SupplierID: selectedProduct.SupplierID,
        CategoryID: selectedProduct.CategoryID,
        QuantityPerUnit: selectedProduct.QuantityPerUnit,
        UnitPrice: selectedProduct.UnitPrice,
        UnitsInStock: selectedProduct.UnitsInStock,
        UnitsOnOrder: selectedProduct.UnitsOnOrder,
        ReorderLevel: selectedProduct.ReorderLevel,
        Discontinued: selectedProduct.Discontinued,
        UserID: storedUID
      });
    }
  };

  return (
    <div className="list">
      <h2>Update Product</h2>
      <div className="listInput">
        <div className="list1"></div>
        <div className="list2">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="list3">
          <select name="ProductID" onChange={handleProductSelect}>
            <option value="">Select a product</option>
            {productList.map((product) => (
              <option key={product.ProductID} value={product.ProductID}>
                {product.ProductName}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="ProductName"
            placeholder="Product Name"
            value={productDetails.ProductName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="SupplierID"
            placeholder="Supplier ID"
            value={productDetails.SupplierID}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="CategoryID"
            placeholder="Category ID"
            value={productDetails.CategoryID}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="QuantityPerUnit"
            placeholder="Quantity Per Unit"
            value={productDetails.QuantityPerUnit}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="UnitPrice"
            placeholder="Unit Price"
            value={productDetails.UnitPrice}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="UnitsInStock"
            placeholder="Units In Stock"
            value={productDetails.UnitsInStock}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="UnitsOnOrder"
            placeholder="Units On Order"
            value={productDetails.UnitsOnOrder}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ReorderLevel"
            placeholder="Reorder Level"
            value={productDetails.ReorderLevel}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Discontinued"
            placeholder="Discontinued"
            value={productDetails.Discontinued}
            onChange={handleInputChange}
          />
          <input
            type="hidden"
            name="UserID"
            value={storedUID}
          />
        </div>
        <div className="list4">
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
