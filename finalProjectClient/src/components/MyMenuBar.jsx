import React from 'react'
import { useState,useEffect  } from 'react'
import Axios from 'axios'

function MyMenuBar({ onLogout }) {
  const [username, setUsername] = useState('');
  const [userID, setUID] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const uid = sessionStorage.getItem('userID')
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

  return (
    <div className="menubox">
      <div className="username">
        <p>{username}{userID}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MyMenuBar;