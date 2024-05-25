import React from 'react'
import { useState,useEffect } from 'react'
import Axios from 'axios'
import HaveImage from './image/Have.png';
import NotHaveImage from './image/notHave.png';

function MyStorage() {

  const [count, setCount] = useState(0);
  const [productList, setProductList] = useState([]);

  /*
  ดึงของตัวเอง
  const [uid, setUID] = useState('');
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const storedUID = sessionStorage.getItem('userID');
    if (storedUID) {
      setUID(storedUID);
      getProduct(storedUID);
    }
  }, []);

  const getProduct = (userID) => {
    console.log('Fetching product data...');
    Axios.get(`http://localhost:8080/api/product/User/${userID}`)
      .then((response) => {
        console.log('Product data received:', response.data.data[0]);
        setProductList(response.data.data[0]); // Assuming response.data.data[0] is the correct structure
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }; */
  const getProduct = () => {
    console.log('Fetching product data...');
    Axios.get('http://localhost:8080/api/product')
      .then((response) => {
        console.log('Product data received:', response.data.data[0]);
        setProductList(response.data.data[0]); // Assuming response.data is an array of product objects
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
            {
            product.PicturePath ? (
              <p><img width="100%" src={HaveImage} /></p>
            ) : (
              <p><img width="100%" src={NotHaveImage} /></p>
            )}
            {console.log(product.PicturePath)}
            <p>{product.ProductName}</p>
            <p>${product.UnitPrice}</p>
            
          </div>
        ))}
    </div>
    
  )
}

export default MyStorage