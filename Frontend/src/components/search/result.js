import React, { useState, useRef, useContext, useEffect } from 'react';
import { MyContext } from '../../MyContext';
import './result.css'; // Ensure this line is correctly pointing to your CSS file
import { useNavigate } from 'react-router';
import StarsIcon from '@mui/icons-material/Stars';
import axios from 'axios';

export default function Result() {
  const [activeTab, setActiveTab] = useState('Dishes');
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);
  const { searchResult } = useContext(MyContext);
  const { menu, setMenu } = useContext(MyContext);
  const { userdetails } = useContext(MyContext);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    updateUnderlineStyle(index);
  };

  useEffect(() => {
    async function fetchCart() {
      console.log('Fetching cart for user:', userdetails.id);
      try {
        const response = await axios.get(`http://localhost:7777/${userdetails.id}/cart/count`);
        console.log('Response from backend:', response.data);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    if (userdetails.id) {
      fetchCart();
    }
  }, [userdetails.id]);

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
    const index = ['Dishes', 'Restaurants'].indexOf(activeTab);
    updateUnderlineStyle(index);
  }, [activeTab]);

  const handleClick = (hotel) => {
    console.log('Selected Hotel:', hotel); // Log the selected hotel
    setMenu(hotel);
    navigate('/menu');
  };

  const noResultsFound = (activeTab === 'Dishes' && searchResult.menuItems.length === 0) ||
                         (activeTab === 'Restaurants' && searchResult.hotels.length === 0);

  return (
    <div>
      <div className="tab-slider-container">
        <div className="tab-slider">
          <div className="tabs">
            {['Dishes', 'Restaurants'].map((tab, index) => (
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
      <div>
        {noResultsFound ? (
          <div className="no-results">
            <p>No Results Found</p>
          </div>
        ) : (
          <>
            {activeTab === 'Dishes' && (
              <div className="flex-container">
                {searchResult.menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} userdetails={userdetails} initialCount={cart[item.id] || 0} />
                ))}
              </div>
            )}
            {activeTab === 'Restaurants' && (
              <div className="hotel-container">
                {searchResult.hotels.map((hotel) => (
                  <div key={hotel.hotelId} className="hotel-card" onClick={() => handleClick(hotel)}>
                    <img src={hotel.hotelUrl} alt={hotel.hotelName} className="hotel-image" />
                    <div className="hotel-info">
                      <h2 className="hotel-name">{hotel.hotelName}</h2>
                      <p className="hotel-rating">
                        <StarsIcon style={{ color: 'green', height: '20px' }} />
                        {hotel.rating}
                      </p>
                      <p className="hotel-location">{hotel.hotelLocation}</p>
                      <p className="hotel-description">{hotel.style}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function MenuItem({ item, userdetails, initialCount }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  async function handleAdd() {
    if (!userdetails.id) {
      alert('Please log in to add items to the cart.');
      return;
    }
    setCount(count + 1);
    try {
      await axios.post(`http://localhost:7777/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id },
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async function handleRemove() {
    if (count > 0) {
      setCount(count - 1);
      try {
        await axios.put(`http://localhost:7777/${userdetails.id}/cart/decrement`, null, {
          params: { menuItemId: item.id },
        });
        console.log('Item removed from cart');
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  }

  return (
    <div style={{ minWidth: '250px', flex: '1 1 calc(25% - 20px)', boxSizing: 'border-box', margin: '10px' }}>
      <div className="flex-item">
        <img src={item.imageUrl} alt={item.name} className="menImage" />
        <div className="menu-item-details">
          <h3>{item.name}</h3>
          {count > 0 ? (
            <div className="control">
              <button className="decrbutton" onClick={handleRemove}>-</button>
              <span className="cart-quantity">{count}</span>
              <button className="incrbutton" onClick={handleAdd}>+</button>
            </div>
          ) : (
            <button className="addbtn" onClick={handleAdd}>Add</button>
          )}
          <p>{item.description}</p>
          <p>Price: ₹{item.price}</p>
          <p>Rating: {item.rating}</p>
        </div>
      </div>
    </div>
  );
}
