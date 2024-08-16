import React, { useContext, useState } from 'react';
import '../checkout/checkout.css'; 
import { MyContext } from '../../MyContext';
import emailjs from 'emailjs-com';
import SuccessPopup from '../checkout/SucessPopup'; 

const DinningCheckout = () => {
  const { bookingDetails, setBookingDetails } = useContext(MyContext);
  const { userdetails } = useContext(MyContext);
  const [name, setName] = useState(userdetails.userName);
  const [contact, setContact] = useState(userdetails.number);
  const [amount, setAmount] = useState(170);
  const { orderPopup, setOrderPopup } = useContext(MyContext);
  const { menu } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orderPopup);
    if (name === "" || contact === "") {
      alert("Please fill out all fields.");
    } else if (window.Razorpay) {
      var options = {
        key: "rzp_test_xtFnbnQ0oQ9B1o",
        key_secret: "6hJKdPHxGCkjBLvHGzdWjsMK",
        amount: amount * 100,
        currency: "INR",
        name: "EatEase",
        description: "Fastest Delivery",
        handler: function (response) {
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
          color: "#3399cc",
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
              <label>Contact Number <span>*</span></label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="order-summary-unique">
          <h2>Your Slot</h2>
          <div className="order-header-unique">
            <span>Details</span>
            <span>Subtotal</span>
          </div>
          <ul className="order-list-unique">
            <li className="order-item-unique"><h5>{menu.hotelName}</h5></li>
            <li className="order-item-unique">Date: {bookingDetails.date ? new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : 'N/A'}</li>
            <li className="order-item-unique">Time: {bookingDetails.time || 'N/A'}</li>
            <li className="order-item-unique">Guest: {bookingDetails.guests || 'N/A'}</li>
          </ul>
          <p className="order-total-unique"><span>Total: ₹170</span></p>
      <button className="place-order-button-unique" type="button" onClick={handleSubmit}>Book Now</button>
        </div>
      </div>
      {orderPopup && <SuccessPopup message="Booking"/>}
    </div>
  );
};

export default DinningCheckout;
