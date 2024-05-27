import React, { useState } from 'react';
import Axios from 'axios';

const UpdateProduct = () => {
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
    UserID: ''
  });

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

    Axios.put('http://localhost:8080/api/product/', formData)
      .then((response) => {
        console.log('Product added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" name="ProductName" placeholder="Product Name" onChange={handleInputChange} />
      <input type="text" name="SupplierID" placeholder="Supplier ID" onChange={handleInputChange} />
      <input type="text" name="CategoryID" placeholder="Category ID" onChange={handleInputChange} />
      <input type="text" name="QuantityPerUnit" placeholder="Quantity Per Unit" onChange={handleInputChange} />
      <input type="text" name="UnitPrice" placeholder="Unit Price" onChange={handleInputChange} />
      <input type="text" name="UnitsInStock" placeholder="Units In Stock" onChange={handleInputChange} />
      <input type="text" name="UnitsOnOrder" placeholder="Units On Order" onChange={handleInputChange} />
      <input type="text" name="ReorderLevel" placeholder="Reorder Level" onChange={handleInputChange} />
      <input type="text" name="Discontinued" placeholder="Discontinued" onChange={handleInputChange} />
      <input type="text" name="UserID" placeholder="User ID" onChange={handleInputChange} />
      <button onClick={handleUpdateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
