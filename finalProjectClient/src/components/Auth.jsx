import React, { useState } from 'react';
import Axios from 'axios';
import API from './api';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    API.get(`/api/auth/${username}/${password}`)
      .then((response) => {
        const user = response.data.data[0][0].Username;
        sessionStorage.setItem('username', user);
        const ID = response.data.data[0][0].ID;
        sessionStorage.setItem('userID', ID);
        onLogin(user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Invalid username or password');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
