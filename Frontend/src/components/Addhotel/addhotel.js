import React, { useState } from 'react';
import axios from 'axios';
import './addhotel.css';

const AddHotel = () => {
    const [hotel, setHotel] = useState({
        hotelName: '',
        hotelLocation: '',
        hotelUrl: '',
        style: '',
        rating: '',
        city: '',
        menuItems: [
            {
                name: '',
                description: '',
                imageUrl: '',
                price: '',
                type: '',
                rating: ''
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel({
            ...hotel,
            [name]: value
        });
    };

    const handleMenuItemChange = (index, e) => {
        const { name, value } = e.target;
        const newMenuItems = hotel.menuItems.map((menuItem, idx) => {
            if (idx === index) {
                return { ...menuItem, [name]: value };
            }
            return menuItem;
        });
        setHotel({
            ...hotel,
            menuItems: newMenuItems
        });
    };

    const addMenuItem = () => {
        setHotel({
            ...hotel,
            menuItems: [
                ...hotel.menuItems,
                { name: '', description: '', imageUrl: '', price: '', type: '', rating: '' }
            ]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const key = prompt("Please enter the key to add the hotel:");
        if (key === "skcet@1911") {
            axios.post('http://localhost:7777/post', hotel)
                .then(response => {
                    console.log(response.data);
                    // Reset the form
                    setHotel({
                        hotelName: '',
                        hotelLocation: '',
                        hotelUrl: '',
                        style: '',
                        rating: '',
                        city: '',
                        menuItems: [
                            { name: '', description: '', imageUrl: '', price: '', type: '', rating: '' }
                        ]
                    });
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            alert("Incorrect key. You are not authorized to add a hotel.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-hotel-form">
            <h2 className="form-title">Add Hotel</h2>
            <input
                type="text"
                name="hotelName"
                value={hotel.hotelName}
                onChange={handleChange}
                placeholder="Hotel Name"
                className="form-input"
            />
            <input
                type="text"
                name="hotelLocation"
                value={hotel.hotelLocation}
                onChange={handleChange}
                placeholder="Hotel Location"
                className="form-input"
            />
            <input
                type="text"
                name="hotelUrl"
                value={hotel.hotelUrl}
                onChange={handleChange}
                placeholder="Hotel URL"
                className="form-input"
            />
            <input
                type="text"
                name="style"
                value={hotel.style}
                onChange={handleChange}
                placeholder="Style"
                className="form-input"
            />
            <input
                type="text"
                name="rating"
                value={hotel.rating}
                onChange={handleChange}
                placeholder="Rating"
                className="form-input"
            />
            <input
                type="text"
                name="city"
                value={hotel.city}
                onChange={handleChange}
                placeholder="City"
                className="form-input"
            />
            <h3 className="menu-title">Menu Items</h3>
            {hotel.menuItems.map((menuItem, index) => (
                <div key={index} className="menuItem">
                    <h4 className="menuItem-title">Menu Item {index + 1}</h4>
                    <input
                        type="text"
                        name="name"
                        value={menuItem.name}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Menu Item Name"
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="description"
                        value={menuItem.description}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Description"
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        value={menuItem.imageUrl}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Image URL"
                        className="form-input"
                    />
                    <input
                        type="number"
                        name="price"
                        value={menuItem.price}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Price"
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="type"
                        value={menuItem.type}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Type"
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="rating"
                        value={menuItem.rating}
                        onChange={(e) => handleMenuItemChange(index, e)}
                        placeholder="Rating"
                        className="form-input"
                    />
                </div>
            ))}
            <button type="button" onClick={addMenuItem} className="add-menuItem-button">Add Menu Item</button>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default AddHotel;
