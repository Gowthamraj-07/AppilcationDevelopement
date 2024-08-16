import React, { useContext, useEffect, useState } from 'react';
import './optionselector.css'; // Import CSS for styling
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
const OptionSelector = () => {
  const [selectedOption, setSelectedOption] = useState('Delivery');
  const { option,setOption } = useContext(MyContext);
  const {dietoption,setDietoption}=useContext(MyContext)
  const navigate=useNavigate();
  useEffect(()=>{
    setOption('menu')
    setDietoption(false)
  },[])
  const handleOptionClick = (choice) => {
    setSelectedOption(choice);
    switch (choice) {
      case 'Delivery':
        setOption('menu');
        setDietoption(false)
        break;
      case 'Dining Out':
        setOption('dinning');
        setDietoption(false)
        break;
      case 'Diet':
        setOption('diet');
        setDietoption(true)
        break;
      default:
        break;
    }
  };

  
  return (
    <div className="option-selector">
      <div
        className={`option ${selectedOption === 'Delivery' ? 'active' : ''}`}
        onClick={() => handleOptionClick('Delivery')}
      >
        <img src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" alt="Delivery" />
        <span>Delivery</span>
      </div>
      <div
        className={`option ${selectedOption === 'Dining Out' ? 'active' : ''}`}
        onClick={() => handleOptionClick('Dining Out')}
      >
        <img src="https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba82073e5f78c65c18b371616149662.png?output-format=webp" alt="Dining Out" />
        <span>Dining Out</span>
      </div>
      <div
        className={`option ${selectedOption === 'Diet' ? 'active' : ''}`}
        onClick={() => handleOptionClick('Diet')}
      >
        <img src="https://icons.veryicon.com/png/o/food--drinks/yoga-flat-icon/healthy-food.png" alt="Diet" />
        <span>Diet</span>
      </div>
    </div>
  );
};

export default OptionSelector;
