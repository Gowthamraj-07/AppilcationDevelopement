import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../MyContext';
import axios from 'axios';
import './cart.css';
import { Link } from 'react-router-dom';
export default function Cart() {
  const { userdetails,setUserdetails } = useContext(MyContext);
  const {cartItems, setCartItems} = useContext(MyContext)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:7777/${userdetails.id}/cart/items`);
        const items = response.data;
        setCartItems(items);

        const total = Object.values(items).reduce((sum, item) => sum + item.price * item.count, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    if (userdetails.id) {
      fetchCartItems();
    }
  }, [userdetails.id]);

  const totalItems = cartItems.length;
  const handleRemoveAll = async () => {
    try {
      await axios.delete(`http://localhost:7777/${userdetails.id}/cart/delete`);
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }

//set carthotel null
await axios.put(`http://localhost:7777/${userdetails.id}/carthotel`, null, {
  params: { carthotel: 707}
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

  };

  return (
    <div id="custom-cart-container">
      <div id="custom-cart-header">
        <h2>Your Cart</h2>
        <a onClick={handleRemoveAll}>Remove all</a>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItem key={index} item={item} userdetails={userdetails} />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div id="custom-cart-footer">
        <div>
          <p id="custom-total-items">Sub-Total ({totalItems} items)</p>
          <p id="custom-subtotal">₹{totalPrice.toFixed(2)}</p>
        </div>
        
        {totalPrice>0&&<Link to="/checkout"><button id="custom-checkout-button" >Checkout</button></Link>}
      </div>
    </div>
  );
}

function CartItem({ item, userdetails }) {
  const [itemCount, setItemCount] = useState(item.count);
  const itemTypeStyle =item.type === 'veg' ? 'green' : 'red'
  
 console.log(itemTypeStyle)
  async function handleAdd() {
    setItemCount(itemCount + 1);
    try {
      await axios.post(`http://localhost:7777/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async function handleRemove() {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
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

  return (
    <div id="custom-cart-item">
      <img src={item.imageUrl} alt={item.name} id="custom-cart-item-image" />
      <div id="custom-cart-item-details">
        <h3 id="custom-cart-item-name">{item.name}</h3>
        <p id="custom-cart-item-size">{item.size}</p>
        <p id="custom-cart-item-veg" style={{color:`${itemTypeStyle}`}}>{item.type}</p>
        <p id="custom-cart-item-price">₹{item.price.toFixed(2)}</p>
      </div>
      <div id="custom-cart-controls">
        <button id="custom-decrement-button" onClick={handleRemove} disabled={itemCount <= 0}>-</button>
        <span id="custom-cart-quantity">{itemCount}</span>
        <button id="custom-increment-button" onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}
