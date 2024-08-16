// SuccessPopup.jsx
import React, { useContext } from 'react';
import './SucessPopup.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router-dom';

const SuccessPopup = ({message}) => {
  const { orderPopup, setOrderPopup } = useContext(MyContext);
  const navigate = useNavigate();

  function handleClose() {
    setOrderPopup(false);
    navigate('/');
  }

  return (
    <div className={`unique-popup-container ${orderPopup ? 'unique-visible' : ''}`}>
      <div className="unique-popup-content">
        <CheckCircleOutlineIcon className="unique-icon" style={{fontSize:'100px'}}/>
        <h2 id="unique-thank-you">Thank you for {message}!</h2>
        <p id="unique-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy.</p>
        <button className="unique-continue-shopping" onClick={handleClose}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
