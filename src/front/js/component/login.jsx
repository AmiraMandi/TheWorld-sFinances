import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Login successful');
        } else {
          setMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error during login');
      });
  };

  const handleLogout = () => {
    fetch('/login', {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Logout successful');
        } else {
          setMessage('Error during logout');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error during logout');
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      {message && <div>{message}</div>}
    </div>
  );
}

export default Login;
