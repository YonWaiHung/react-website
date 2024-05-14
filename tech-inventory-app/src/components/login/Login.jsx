// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

// Reducer for custom login states
function loginReducer(state, action) {
  switch (action.type) {
    // If input_username dispatched,
    case 'input_username':
      return{
        // Copy existing state properties into a new state object, ensuring immutability
        ...state,
        // Assign state variable username to payload provided from the function
        username: action.payload,
      };
    // If input_password dispatched,
    case 'input_password':
      return{
        ...state,
        // Assign password to payload provided
        password: action.payload,
      };
    // If start_loading dispatched,
    case 'start_loading':
      return{
        ...state,
        // set loading to true, starting the timeout
        loading: true,
      };
    // If stop_loading is dispatched
    case 'stop_loading':
      return{
        ...state,
        loading: false,
      };
    // If login_error is dispatched
    case 'login_error':
      return{
        ...state,
        // Assign errorText to error dialog
        errorText: action.payload,
      };
    // If invalid action type is dispatched
    default:
      throw Error('Unknown action: ' + action.type);
  }
}
function Login({ onLoginSuccess }) {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // Set the initial state of the variables needed
  const [state, dispatch] = useReducer(
    loginReducer, { 
      username: "", 
      password: "", 
      loading: false, 
      errorText: "" 
    }
  );

  // Dispatch desired type to match on switch case above with
  // payload if any additional data needs to be passed
  const handleUsernameChange = (event) => dispatch({
    type: 'input_username',
    payload: event.target.value,
  });

  const handlePasswordChange = (event) => dispatch({
    type: 'input_password',
    payload: event.target.value,
  });
  const handleErrorChange = (event) => dispatch({
    type: 'login_error',
    payload: event,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch & start loading as the form is being submitted
    dispatch({
      type: 'start_loading',
    })
    try {
      // Validate form input content
      await submitForm(state.username, state.password);
      // If no error, call onLoginSuccess function
      onLoginSuccess();
    } catch (err) {
      // If error, trigger handleErrorChange function
      console.error(err.message);
      handleErrorChange(err.message);
    } finally {
      // At the end, dispatch & stop loading
      dispatch({
        type: 'stop_loading',
      })
    }
  };

  function submitForm(username, password) {
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      // Check login input
      setTimeout(() => {
        let correctUsername = 'a';
        let correctPassword = 'd';
        if (username !== correctUsername || password !== correctPassword) {
          // throw error message back to handleSubmit function
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
      <p>{state.errorText}</p>
      <br />
      <input value={state.username} onChange={handleUsernameChange} />
      <br />
      <input value={state.password} onChange={handlePasswordChange} />
      <br />
      <button type="submit" disabled={state.username.length === 0 || state.password.length === 0 || state.loading}>Login</button>
      <br />
    </form>
  );
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
}
export default Login