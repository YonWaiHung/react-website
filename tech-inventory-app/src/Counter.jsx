// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

function Counter() {

  // useState function allow creation of stateful variables that update in the virtual DOM
  const [count, setCount] = useState(0);

  const increment = () => {
    // Updating function (the =>) which take pending state (c) to calculate 
    // React puts your updater function in a queue (waiting in line)
    // During the next render, it will call them in the same order
    // (gud practice to use first letter of var or add prev to front e.g. prevCount)
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  const decrement = () => {
    setCount(c => c - 1);
    setCount(c => c - 1);
  };

  const reset = () => {
    setCount(0);
  }

  return (
    <div className="counter-container">
      <p className="count-display">{count}</p>
      <button className='counter-button' onClick={decrement}>Decrement</button>
      <button className='counter-button' onClick={reset}>Reset</button>
      <button className='counter-button' onClick={increment}>Increment</button>
    </div>
  );
  
}

export default Counter