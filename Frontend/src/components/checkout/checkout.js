import React, { useContext, useState, useEffect } from 'react';
import './checkout.css'; // Ensure this path is correct
import { MyContext } from '../../MyContext';
import emailjs from 'emailjs-com';
import SuccessPopup from './SucessPopup';
import axios from 'axios';
import { toast } from 'react-toastify';
const Checkout = () => {
  const { cartItems, userdetails, orderPopup, setOrderPopup } = useContext(MyContext);

  const [name, setName] = useState(userdetails.userName);
  const [contact, setContact] = useState(userdetails.number);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(calculateTotal());
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  const sendEmail = (templateId, templateParams) => {
    emailjs.send('service_w8xg0nj', templateId, templateParams, 'WZQ3WHKEsuFntIHhn')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        
      }, (error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email');
      });
  };

  const handleOrderSubmission = async () => {
    // Prepare the order data with the correct structure
    const orderData = {
        userId: userdetails.id,
        hotelId: userdetails.carthotel, // Make sure this is the correct hotel ID
        items: cartItems.reduce((acc, item) => {
            acc[item.id] = item.count; // item.id as the key, item.count as the value
            return acc;
        }, {}),
        totalPrice: amount,
    };

    console.log('Order Data:', orderData);

    try {
        const response = await axios.post('http://localhost:7777/api/orders/placeOrder', orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Order submitted successfully', response.data);
        return response.data.id; // Return the order ID if needed for further operations
    } catch (error) {
        console.error('Failed to submit order:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!name || !contact || !streetAddress || !city || !postcode || amount === "") {
      toast.error('Fill all the fields.', {
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

    // Handle order submission and payment
    if (window.Razorpay) {
      var options = {
        key: "rzp_test_xtFnbnQ0oQ9B1o",
        key_secret: "6hJKdPHxGCkjBLvHGzdWjsMK",
        amount: amount * 100,
        currency: "INR",
        name: "EatEase",
        description: "Fastest Delivery",
        handler: function (response) {
          sendEmail('template_5una2ao', {
            to_name: name,
            message: cartItems.map(item => `${item.name} × ${item.count}`).join(', '),
            total_price: amount,
            user_email: userdetails.email
          });
          handleOrderSubmission()
            setOrderPopup(true);
          },
          prefill: {
            name: name,
            email: userdetails.email,
            contact: contact,
          },
          notes: {
            address: "Razorpay Corporate office",
          },
          theme: {
            color: "#339989",
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    };
  

  return (
    <div className="checkout-container-unique">
      <h1 className="checkout-title-unique">Checkout</h1>
      <div className="billing-and-order-container-unique">
        <div className="billing-details-unique">
          <h2>Billing details</h2>
          <form className="billing-form-unique" onSubmit={handleSubmit}>
            <div className="form-group-unique">
              <label>Name <span>*</span></label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group-unique">
              <label>Contact <span>*</span></label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-group-unique">
              <label>Street address <span>*</span></label>
              <input
                type="text"
                placeholder="House number and street name"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div className="form-group-unique">
              <label>Town / City <span>*</span></label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div className="form-group-unique">
              <label>Postcode / ZIP <span>*</span></label>
              <input
                type="text"
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="order-summary-unique">
          <h2>Your order</h2>
          <div className="order-header-unique">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          <ul className="order-list-unique">
            {cartItems.map((item, index) => (
              <li key={index} className="order-item-unique">
                {item.name} × {item.count} <span>₹{item.price * item.count}</span>
              </li>
            ))}
          </ul>
          <p className="order-total-unique">Total: <span>₹{calculateTotal()}</span></p>
          <button className="place-order-button-unique" type="submit" onClick={handleSubmit}>Place order</button>
        </div>
      </div>
      {orderPopup && <SuccessPopup message="Order placed successfully!" />}
    </div>
  );
};

export default Checkout;
