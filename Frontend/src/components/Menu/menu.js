import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../MyContext';
import './Menu.css';
import StarsIcon from '@mui/icons-material/Stars';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Datas from './datavalue';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getChats } from 'react-chat-engine';
import { toast } from 'react-toastify';

export default function Menu() {
  const { menu, userdetails, carthotel, setCarthotel } = useContext(MyContext);
  const [cart, setCart] = useState({});
  const [chatId, setChatId] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menu.menuItems);
  const [foodTypeFilter, setFoodTypeFilter] = useState('all');
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    // Fetch cart logic as before
  }, [userdetails.id]);

  useEffect(() => {
    // Fetch chatId logic as before
  }, [userdetails]);

  useEffect(() => {
    let filteredItems = [...menu.menuItems];

    if (foodTypeFilter === 'veg') {
      filteredItems = filteredItems.filter(item => item.type === 'veg');
    } else if (foodTypeFilter === 'nonVeg') {
      filteredItems = filteredItems.filter(item => item.type === 'nonveg');
    }

    if (sortType === 'priceLowToHigh') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHighToLow') {
      filteredItems.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      filteredItems.sort((a, b) => b.rating - a.rating);
    }

    setFilteredMenuItems(filteredItems);
  }, [foodTypeFilter, sortType, menu.menuItems]);

  const handleFilterChange = (filterType) => {
    if (filterType === 'veg' || filterType === 'nonVeg') {
      setFoodTypeFilter(prev => (prev === filterType ? 'all' : filterType));
    } else {
      setSortType(prev => (prev === filterType ? null : filterType));
    }
  };

  return (
    <div className="menu-container">
      <p className="stylish-menu">Menu</p>

      <div className="filter-options">
        <div className="filter-group">
          <button
            onClick={() => handleFilterChange('veg')}
            className={foodTypeFilter === 'veg' ? 'active' : ''}
          >
            Veg
          </button>
          <button
            onClick={() => handleFilterChange('nonVeg')}
            className={foodTypeFilter === 'nonVeg' ? 'active' : ''}
          >
            Non-Veg
          </button>
        </div>
        <div className="filter-group sorting-group">
          <button
            onClick={() => handleFilterChange('priceLowToHigh')}
            className={sortType === 'priceLowToHigh' ? 'active' : ''}
          >
            Price Low to High
          </button>
          <button
            onClick={() => handleFilterChange('priceHighToLow')}
            className={sortType === 'priceHighToLow' ? 'active' : ''}
          >
            Price High to Low
          </button>
          <button
            onClick={() => handleFilterChange('rating')}
            className={sortType === 'rating' ? 'active' : ''}
          >
            Sort by Rating
          </button>
        </div>

      </div>

      {/* Render filtered menu items */}
      {filteredMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          userdetails={userdetails}
          initialCount={cart[item.id] || 0}
          chatId={chatId}
          menu={menu}
          carthotel={carthotel}
          setCarthotel={setCarthotel}
          setCart={setCart}
        />
      ))}
    </div>
  );
}



function MenuItem({ item, userdetails, initialCount, chatId, menu, carthotel, setCarthotel, setCart }) {
  const [count, setCount] = useState(initialCount);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [replaceCartOpen, setReplaceCartOpen] = useState(false);
  const { setUserdetails } = useContext(MyContext);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleClose = () => setOpen(false);
  const handleReplaceCartClose = () => setReplaceCartOpen(false);

  const handleInfoClick = (menuId) => {
    const menuItem = Datas.find((item) => item.id === menuId);
    setSelectedItem(menuItem);
    setOpen(true);
  };

  async function handleAdd() {
    if (!userdetails.id) {
      toast.info('Log in to Add item to cart!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      return;
    }
    console.log("userhotel: "+userdetails.carthotel)
    console.log("menuhotel:"+menu.hotelName)
    if (!userdetails.carthotel||userdetails.carthotel===707) {
      try {
        await axios.put(`http://localhost:7777/${userdetails.id}/carthotel`, null, {
          params: { carthotel: menu.hotelId }
        });
        setCarthotel(menu.hotelName);
      } catch (error) {
        console.error('Error setting carthotel:', error);
        alert("Error setting carthotel.");
        return;
      }
      try {
        const response = await axios.get('http://localhost:7777/api/getusers');
        const users = response.data;
        const user = users.find(
          (user) => user.email === userdetails.email && user.password === userdetails.password
        );
  
        if (user) {
          setUserdetails(user);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    } else if (userdetails.carthotel !== menu.hotelId) {
      setReplaceCartOpen(true);
      return;
    }

    setCount(count + 1);
    try {
      await axios.post(`http://localhost:7777/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async function handleReplaceCart(confirm) {
    if (confirm) {
      try {
        // Clear existing cart
        await axios.delete(`http://localhost:7777/${userdetails.id}/cart/delete`);
        setCart({});
        setCount(1);
  
        // Add new item to cart
        await axios.post(`http://localhost:7777/${userdetails.id}/cart`, null, {
          params: { menuItemId: item.id }
        });
        console.log('Item added to cart');
  
        // Update carthotel
        await axios.put(`http://localhost:7777/${userdetails.id}/carthotel`, null, {
          params: { carthotel: menu.hotelId }
        });
        try {
          const response = await axios.get('http://localhost:7777/api/getusers');
          const users = response.data;
          const user = users.find(
            (user) => user.email === userdetails.email && user.password === userdetails.password
          );
    
          if (user) {
            setUserdetails(user);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        setCarthotel(menu.hotelName);
  
      } catch (error) {
        console.error('Error handling cart replacement:', error);
      }
    }
    setReplaceCartOpen(false);
  }
  

  async function handleRemove() {
    if (count > 0) {
      setCount(count - 1);
      try {
        await axios.put(`http://localhost:7777/${userdetails.id}/cart/decrement`, null, {
          params: { menuItemId: item.id }
        });
        console.log('Item removed from cart');
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  }

  async function handleAddToGroup() {
    if (!chatId) {
      alert('No group chat available.');
      return;
    }

    const messageData = {
      text: `<div>
              <img src="${item.imageUrl}" alt="${item.name}"/>
              <h3>${item.name}</h3>
              <h4>Restaurant: ${menu.hotelName}</h4>
              <p>${item.description}</p>
              <p>₹${item.price.toFixed(2)}</p>
             </div>`,
      custom_json: JSON.stringify({ menuItemId: item.id })
    };

    try {
      console.log('Sending message to group:', messageData);
      const response = await axios.post(`https://api.chatengine.io/chats/${chatId}/messages/`, messageData, {
        headers: {
          'Project-ID': '2b57e581-62e7-4736-9cd7-0bd0291860bf',
          'User-Name': userdetails.userName,
          'User-Secret': userdetails.password,
          'Content-Type': 'application/json'
        }
      });
      console.log('Message sent:', response.data);
      alert("Added to Group");
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  }

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
        <p className="menu-item-price">₹{item.price.toFixed(2)}</p>
        {count > 0 ? (
          <div className="cart-controls">
            <button className="decrement-button" onClick={handleRemove}>-</button>
            <span className="cart-quantity">{count}</span>
            <button className="increment-button" onClick={handleAdd}>+</button>
          </div>
        ) : (
          <button className="add-to-button" onClick={handleAdd}>Add</button>
        )}
        {chatId && <button className="add-to-button" style={{ marginTop: '3px' }} onClick={handleAddToGroup}>Add to Group</button>}
      </div>
      <InfoIcon className="info-icon" onClick={() => handleInfoClick(item.id)} />
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
              <p>Calcium: {selectedItem.nutrition.calcium} %</p>
              <p>Iron: {selectedItem.nutrition.iron} %</p>
            </div>
          )}
        </Box>
      </Modal>
      <Modal open={replaceCartOpen} onClose={handleReplaceCartClose} aria-labelledby="replace-cart-modal-title" aria-describedby="replace-cart-modal-description">
      <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: '8px',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
    }}
  >
    <h2
      id="replace-cart-modal-title"
      style={{
        marginBottom: '16px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
      }}
    >
      Replace Cart Items?
    </h2>
    <p
      id="replace-cart-modal-description"
      style={{
        marginBottom: '24px',
        fontSize: '1rem',
        color: '#666',
      }}
    >
      Your cart contains items from another hotel. Do you want to replace them
      with items from {menu.hotelName}?
    </p>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleReplaceCart(true)}
        sx={{
          bgcolor: '#007bff', // Professional blue color
          '&:hover': {
            bgcolor: '#0056b3',
          },
        }}
      >
        Yes
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleReplaceCart(false)}
        sx={{
          color: '#6c757d', // Professional gray color
          borderColor: '#6c757d',
          '&:hover': {
            bgcolor: '#e2e6ea',
            borderColor: '#5a6268',
          },
        }}
      >
        No
      </Button>
    </Box>
  </Box>
      </Modal>
    </div>
  );
}
