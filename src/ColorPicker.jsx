// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import PropTypes from 'prop-types';

function ColorPicker({colorDisplay = "", onColorChange}) {
  
  // const [color, setColor] = useState("#FFFFFF");

  // function handleColorChange(event) {
  //   setColor(event.target.value);
  // }

  return(
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div className="color-display" style={{backgroundColor: colorDisplay}}>
        <p>Selected Color: {colorDisplay}</p>
      </div>
      <label>Select a Color</label>
      <input type="color" value={colorDisplay} onChange={onColorChange}/>
    </div>
  );
}

ColorPicker.propTypes = {
  colorDisplay: PropTypes.string,
  onColorChange: PropTypes.func,
}

export default ColorPicker