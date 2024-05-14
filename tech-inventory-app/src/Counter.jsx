// eslint-disable-next-line no-unused-vars
import React, { useState, useReducer, useEffect } from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'increment_count':
      return {
        count: state.count + 1
      };
    case 'decrement_count':
      return {
        count: state.count - 1
      };
    case 'reset_count':
      return {
        count: 0
      };
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function Counter() {

  // useState function allow creation of stateful variables that update in the virtual DOM
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  useEffect (() => {
    console.log("Component rendered");
  });

  const increment = () => {
    // Updating function (the =>) which take pending state (c) to calculate 
    // React puts your updater function in a queue (waiting in line)
    // During the next render, it will call them in the same order
    // (gud practice to use first letter of var or add prev to front e.g. prevCount)
    // setCount(c => c + 1);
    // setCount(c => c + 1);
    dispatch({
      type: 'increment_count',
    })
  };

  const decrement = () => {
    dispatch({
      type: 'decrement_count',
    })
  };

  const reset = () => {
    dispatch({
      type: 'reset_count',
    })
  }

  return (
    <div className="counter-container">
      <p className="count-display">{state.count}</p>
      <button className='counter-button' onClick={decrement}>Decrement</button>
      <button className='counter-button' onClick={reset}>Reset</button>
      <button className='counter-button' onClick={increment}>Increment</button>
    </div>
  );

}

export default Counter