import React from 'react'
import { useState } from 'react'

function MyStorage() {

    const [products] = useState([
        {
          id: 1,
          name: 'Product 1',
          image: 'product1.jpg',
          price: 10.99
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'product2.jpg',
          price: 19.99
        },
        {
          id: 3,
          name: 'Product 3',
          image: 'product3.jpg',
          price: 14.99
        },
        {
          id: 4,
          name: 'Product 3',
          image: 'product3.jpg',
          price: 14.99
        },
        {
          id: 5,
          name: 'Product 3',
          image: 'product3.jpg',
          price: 14.99
        },
        {
          id: 6,
          name: 'Product 3',
          image: 'product3.jpg',
          price: 14.99
        },
        {
          id: 7,
          name: 'Product 3',
          image: 'product3.jpg',
          price: 14.99
        }

      ]);


  return (
    
    <div className="storagebox">
        {products.map(product => (
          <div key={product.id} className="product">
            <p>{product.name}</p>
            <p>${product.price}</p>
            
          </div>
        ))}
    </div>
    
  )
}

export default MyStorage