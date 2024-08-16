import React, { useState } from 'react';
import axios from 'axios';
import './addmenuitem.css';

const AddMenuItem = () => {
    const [hotelId, setHotelId] = useState('');
    const [hotel, setHotel] = useState(null);
    const [menuItem, setMenuItem] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: '',
        type: '',
        rating: ''
    });

    const handleHotelIdChange = (e) => {
        setHotelId(e.target.value);
    };

    const fetchHotelDetails = async () => {
        try {
            console.log(hotelId);
            const response = await axios.get(`http://localhost:7777/${hotelId}`);
            setHotel(response.data);
        } catch (error) {
            console.error('There was an error fetching the hotel data!', error);
            setHotel(null);
        }
    };

    const handleMenuItemChange = (e) => {
        const { name, value } = e.target;
        setMenuItem({
            ...menuItem,
            [name]: value
        });
    };

    const addMenuItem = () => {
        const key = prompt('Please enter the key to add the menu item:');
        if (key === 'gowtham') {
            axios.post(`http://localhost:7777/${hotelId}/menuItems`, menuItem)
                .then(response => {
                    setHotel(response.data);  // Update the hotel data to reflect the newly added menu item
                    // Reset the menu item form
                    setMenuItem({
                        name: '',
                        description: '',
                        imageUrl: '',
                        price: '',
                        type: '',
                        rating: ''
                    });
                })
                .catch(error => {
                    console.error('There was an error adding the menu item!', error);
                });
        } else {
            alert('Invalid key. Menu item not added.');
        }
    };

    return (
        <div className="add-menu-item">
            <h2 className="form-title">Add Menu Items to Hotel</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={hotelId}
                    onChange={handleHotelIdChange}
                    placeholder="Enter Hotel ID"
                    className="form-input"
                />
                <button onClick={fetchHotelDetails} className="fetch-button">Fetch Hotel</button>
            </div>
            {hotel && (
                <div className="hotel-details">
                    <img src={hotel.hotelUrl} alt={hotel.hotelName} className="hotel-image" />
                    <h3>{hotel.hotelName}</h3>
                    <p>{hotel.hotelLocation}</p>
                    <h3 style={{marginTop:'10px',marginBottom:'10px'}}>Current Menu Items</h3>
                    <ul style={{textAlign:"left"}}>
                        {hotel.menuItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.type} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="menu-item-form">
                <h3>Add Menu Item</h3>
                <input
                    type="text"
                    name="name"
                    value={menuItem.name}
                    onChange={handleMenuItemChange}
                    placeholder="Menu Item Name"
                    className="form-input"
                />
                <input
                    type="text"
                    name="description"
                    value={menuItem.description}
                    onChange={handleMenuItemChange}
                    placeholder="Description"
                    className="form-input"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={menuItem.imageUrl}
                    onChange={handleMenuItemChange}
                    placeholder="Image URL"
                    className="form-input"
                />
                <input
                    type="number"
                    name="price"
                    value={menuItem.price}
                    onChange={handleMenuItemChange}
                    placeholder="Price"
                    className="form-input"
                />
                <input
                    type="text"
                    name="type"
                    value={menuItem.type}
                    onChange={handleMenuItemChange}
                    placeholder="Type"
                    className="form-input"
                />
                <input
                    type="text"
                    name="rating"
                    value={menuItem.rating}
                    onChange={handleMenuItemChange}
                    placeholder="Rating"
                    className="form-input"
                />
                <button onClick={addMenuItem} className="add-button">Add Menu Item</button>
            </div>
        </div>
    );
};

export default AddMenuItem;
