import React, { useState,useEffect} from 'react';
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
    UserID: ''
  });
  const storedUID = sessionStorage.getItem('userID');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('productImage', selectedFile);

    for (const key in productDetails) {
      formData.append(key, productDetails[key]);
    }

    Axios.post('http://localhost:8080/api/product', formData)
      .then((response) => {
        console.log('Product added successfully:', response.data);
        window.alert('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        window.alert('Error adding product!');
      });
  };

  return (
    <div className='list'>
      <h2>Add Product</h2>
      <div className='listInput'>
        <div className='list1'></div>
        <div className='list2'>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className='list3'>
          <input type="text" name="ProductName" placeholder="Product Name" onChange={handleInputChange} />
          <input type="text" name="SupplierID" placeholder="Supplier ID" onChange={handleInputChange} />
          <input type="text" name="CategoryID" placeholder="Category ID" onChange={handleInputChange} />
          <input type="text" name="QuantityPerUnit" placeholder="Quantity Per Unit" onChange={handleInputChange} />
          <input type="text" name="UnitPrice" placeholder="Unit Price" onChange={handleInputChange} />
          <input type="text" name="UnitsInStock" placeholder="Units In Stock" onChange={handleInputChange} />
          <input type="text" name="UnitsOnOrder" placeholder="Units On Order" onChange={handleInputChange} />
          <input type="text" name="ReorderLevel" placeholder="Reorder Level" onChange={handleInputChange} />
          <input type="text" name="Discontinued" placeholder="Discontinued" onChange={handleInputChange} />
          <input type="hidden" name="UserID" placeholder="User ID" value={storedUID} />
        </div>
        <div className='list4'>
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
