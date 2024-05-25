import React, { useState } from 'react';
import Axios from 'axios';

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    ProductName: '',
    SupplierID: '',
    CategoryID: '',
    QuantityPerUnit: '',
    UnitPrice: '',
    UnitsInStock: '',
    UnitsOnOrder: '',
    ReorderLevel: '',
    Discontinued: '',
    UserID: '',
    // other fields
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    for (const key in productDetails) {
      formData.append(key, productDetails[key]);
    }

    Axios.post('http://localhost:8080/api/product', formData)
      .then((response) => {
        console.log('Product added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" name="ProductName" placeholder="Product Name" onChange={handleInputChange} />
      {/* Add other input fields for product details */}
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
