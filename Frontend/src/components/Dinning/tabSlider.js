// TabSlider.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import './tabSlider.css';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Datas from '../Menu/datavalue';
import IconButton from '@mui/material/IconButton';
import StarsIcon from '@mui/icons-material/Stars';
import InfoIcon from '@mui/icons-material/Info';
import { MyContext } from '../../MyContext';
import About from './about'; // Import the About component

const TabSlider = () => {
  const [activeTab, setActiveTab] = useState('Offers');
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);
  const { menu } = useContext(MyContext);

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    updateUnderlineStyle(index);
  };

  const updateUnderlineStyle = (index) => {
    const tab = tabsRef.current[index];
    if (tab) {
      setUnderlineStyle({
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      });
    }
  };

  useEffect(() => {
    const index = ['Offers', 'Menu', 'Photos', 'About'].indexOf(activeTab);
    updateUnderlineStyle(index);
  }, [activeTab]);

  return (
    <div>
      <div className="tab-slider-container">
        <div className="tab-slider">
          <div className="tabs">
            {['Offers', 'Menu', 'Photos', 'About'].map((tab, index) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab, index)}
                ref={(el) => (tabsRef.current[index] = el)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="underline" style={underlineStyle} />
        </div>
      </div>
      {activeTab === 'Offers' && (
        <div className="offers-container">
          <div className="offer-banner">Offer 1: 20% off on all orders!</div>
          <div className="offer-banner">Offer 2: Buy 1 Get 1 Free!</div>
          <div className="offer-banner">Offer 3: Free delivery on orders over ₹500!</div>
        </div>
      )}
      {activeTab === 'Menu' && (
        <div className="menu-container">
          <p className="stylish-menu">Menu</p>
          {menu.menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      )}
      {activeTab === 'About' && <About />} {/* Render the About component */}
    </div>
  );
};

function MenuItem({ item }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleInfoClick = (menuId) => {
    const menuItem = Datas.find((item) => item.id === menuId);
    setSelectedItem(menuItem);
    setOpen(true);
  };

  return (
    <div className="menu-item">
      <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
      <div className="menu-item-details">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <p className="menu-item-rating">
          <StarsIcon style={{ color: 'green', fontSize: '20px', marginRight: '3px' }} />
          {item.rating}
        </p>
        <p className="menu-item-price">₹{item.price}</p>
      </div>
      <InfoIcon className="info-icon" onClick={() => handleInfoClick(item.id)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 3,
            overflow: 'hidden',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              {selectedItem ? selectedItem.name : 'Nutritional Info'}
            </h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedItem && (
            <div style={{ textAlign: 'center' }}>
              <p>Calories: {selectedItem.nutrition.calories} kcal</p>
              <p>Protein: {selectedItem.nutrition.protein} g</p>
              <p>Carbs: {selectedItem.nutrition.carbs} g</p>
              <p>Sugars: {selectedItem.nutrition.sugars} g</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default TabSlider;
