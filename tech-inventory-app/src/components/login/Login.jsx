// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
function Login({ onLoginSuccess }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleErrorChange = (event) => setError(event);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitForm(username, password);
      onLoginSuccess();
    } catch (err) {
      console.error(err.message);
      handleErrorChange(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function submitForm(username, password) {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let correctUsername = 'admin';
        let correctPassword = 'password123';
        if (username !== correctUsername || password !== correctPassword) {
          reject(new Error('Invalid Username or Password'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }

  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <h2>Log In</h2>
      <p>{error}</p>
      <br/>
      <input value={username} onChange={handleUsernameChange} />
      <br/>
      <input value={password} onChange={handlePasswordChange} />
      <br/>
      <button type="submit" disabled={username.length === 0 || password.length === 0 || isLoading}>Login</button>
      <br/>
    </form>
  );

}

export default Login