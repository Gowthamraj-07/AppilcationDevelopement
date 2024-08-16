import React, { useState, useEffect, useContext } from 'react';
import './tablebook.css';
import { MyContext } from '../../MyContext';
import { Link } from 'react-router-dom';

const TableBooking = () => {
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const { menu, bookingDetails, setBookingDetails } = useContext(MyContext);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    updateAvailableTimes();
    setDates(getNextSevenDays()); // Initialize dates
  }, []);

  useEffect(() => {
    // Set default booking details when the slot picker opens
    if (showSlotPicker && dates.length > 0 && availableTimes.length > 0) {
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        date: dates[0],
        time: availableTimes[0],
        guests: prevDetails.guests || 2 // Default to 2 guests if not set
      }));
    }
  }, [showSlotPicker, dates, availableTimes]);

  const updateAvailableTimes = () => {
    const times = [];
    const now = new Date();
    now.setMinutes(0, 0, 0); // Start from the current hour

    for (let i = 1; i <= 8; i++) {
      now.setHours(now.getHours() + 1);
      times.push(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setAvailableTimes(times);
  };

  const handleSelectSlot = () => {
    setShowSlotPicker(true);
  };

  const handleCloseSlotPicker = () => {
    setShowSlotPicker(false);
  };

  const handleDateClick = (date) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, date }));
  };

  const handleTimeClick = (time) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, time }));
  };

  const handlePersonClick = (guests) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, guests }));
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <div className="restaurant-booking">
      <div className="restaurant-header">
        <div className="restaurant-info">
          <img
            src={menu.hotelUrl}
            alt="Restaurant"
            className="restaurant-image"
          />
          <div>
            <h2>{menu.hotelName}</h2>
            <p>{menu.hotelLocation}, {menu.city}</p>
            <div className="restaurant-tags">
              <span>{menu.style}</span>
            </div>
            <p>⭐ {menu.rating} <a href="#reviews">1 reviews</a></p>
            <p>Select Slot & Guests</p>
            <button className="select-slot-button" onClick={handleSelectSlot}>
              Select Slot
            </button>
          </div>
        </div>
        <div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.162425157759!2d77.01706937504551!3d11.026437589137931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85747b265b62d%3A0x81ab3db2ca7fbd12!2sChinese%20Wok!5e0!3m2!1sen!2sin!4v1722442667030!5m2!1sen!2sin" 
            width="400" 
            height="270"  
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      <hr className='horizontal-line'/>
      <div className="offers-section">
        {showSlotPicker && (
          <div className="slot-picker-overlay">
            <div className="slot-picker">
              <button className="close-slot-picker" onClick={handleCloseSlotPicker}>X</button>
              <div className="date-picker">
                <p style={{ textAlign: 'left', margin: '10px 0 5px 0' }}>Select Date</p>
                <div className="date-buttons">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={bookingDetails.date?.toDateString() === date.toDateString() ? 'selected' : ''}
                    >
                      {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </button>
                  ))}
                </div>
              </div>
              <div className="time-picker">
                <p style={{ textAlign: 'left', margin: '10px 0 5px 0' }}>Select Time</p>
                <div className="time-buttons">
                  {availableTimes.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeClick(time)}
                      className={bookingDetails.time === time ? 'selected' : ''}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="guest-number-picker">
                <p style={{ textAlign: 'left', margin: '10px 0 5px 0' }}>Number of Guests</p>
                <div className="person-buttons">
                  {[...Array(9).keys()].map((person) => (
                    <button
                      key={person}
                      onClick={() => handlePersonClick(person + 1)}
                      className={bookingDetails.guests === person + 1 ? 'selected' : ''}
                    >
                      {person + 1}
                    </button>
                  ))}
                </div>
              </div>
              <Link to='/dinningcheckout'><button 
                className="find-offer-button" 
                disabled={!bookingDetails.date || !bookingDetails.time || !bookingDetails.guests}
              >
                Book Now!
              </button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableBooking;
