import React, { useState, useEffect } from 'react';

function MyMenuBar({ onLogout, setActiveComponent }) {
  const [username, setUsername] = useState('');
  const [userID, setUID] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const uid = sessionStorage.getItem('userID');
    if (uid) {
      setUID(uid);
    }
  }, []);

  const handleLogout = () => {
    setUsername('');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userID');
    onLogout();
  };

  const handleAdd = () => {
    setActiveComponent('Add');
  };

  const handleUpdate = () => {
    setActiveComponent('Update');
  };

  return (
    <div className="menubox">
      <div className="username">
        <p>{username}</p>
      </div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyMenuBar;
