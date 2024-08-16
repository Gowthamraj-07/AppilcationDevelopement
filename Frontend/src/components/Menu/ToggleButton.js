import React, { useState } from 'react';
import './ToggleButton.css';

function ToggleButton() {
  const [isVeg, setIsVeg] = useState(true);

  const toggle = () => {
    setIsVeg(prev => !prev);
  };

  return (
    <div className={`toggle-container ${isVeg ? 'veg' : 'non-veg'}`} onClick={toggle}>
      <div className="toggle-slider">
        <div className={`symbol ${isVeg ? 'veg-symbol' : 'non-veg-symbol'}`}></div>
      </div>
    </div>
  );
}

export default ToggleButton;
