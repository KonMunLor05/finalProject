import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import API from './api';
import MyStorage from './components/MyStorage';
import MyMenuBar from './components/MyMenuBar';
import Login from './components/Auth';
import Add from './components/AddProduct';
import Update from './components/UpdateProduct';
import DetailProduct from './components/DetailProduct';
import OwnerStore from './components/OwnerStore';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [activeComponent, setActiveComponent] = useState('Add');
  const [activeDetail, setActiveDetail] = useState('All');
  const [activeDetailID, setActiveDetailID] = useState('');
  const [storeList, setStoreList] = useState('');
  const [UID, setUID] = useState('');


  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedUID = sessionStorage.getItem('userID');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
      setUID(storedUID);
    } else {
      getUser();
    }
  }, []);

  const getUser = () => {
    API.get('/api/auth/Test1/12345')
      .then((response) => {
        console.log('User data received:', response.data.data[0][0]);
        const user = response.data.data[0][0].Username;
        setUsername(user);
        sessionStorage.setItem('username', user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleLogin = (username) => {
    setUsername(username);
    setIsAuthenticated(true);
    sessionStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
    sessionStorage.removeItem('username');
  };

  const handleProductClick = (productID) => {
    setActiveDetail('Detail');
    setActiveDetailID(productID);
  };

  const handleReturn = () => {
    setActiveDetail('All');
    setActiveDetailID('');
  };

  const handleStore = () => {
    setStoreList('');
  };
  const handleStorage = () => {
    setStoreList(UID);
  };


  return (
    <>
      {isAuthenticated ? (
        <>
          <MyMenuBar onLogout={handleLogout} setActiveComponent={setActiveComponent} />
          <h1>Welcome, {username}!</h1>
          {activeComponent === 'Add' && <Add />}
          {activeComponent === 'Update' && <Update />}
          <h1>Storage</h1>
          {activeDetail === 'All' &&<button onClick={handleStore}>Store</button>}
          {activeDetail === 'All' &&<button onClick={handleStorage}>MyStorage</button>}
          {activeDetail === 'All' && storeList == ''&&<MyStorage setActiveDetail={handleProductClick} />}
          {activeDetail === 'All' && storeList!= '' &&<OwnerStore setActiveDetail={handleProductClick} />}
          {activeDetail === 'Detail' && <DetailProduct productID={activeDetailID} onReturn={handleReturn} />}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
