import React, { useContext, useState } from 'react';
import { MyContext } from '../../MyContext';
import './DietMenu.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function DietMenu() {
    const { menu, userdetails, setCarthotel } = useContext(MyContext);
    const [cart, setCart] = useState({});

    const handleAdd = async (item) => {
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

        try {
            await axios.post(`http://localhost:7777/${userdetails.id}/cart`, null, {
                params: { menuItemId: item.id }
            });
            setCart((prevCart) => ({
                ...prevCart,
                [item.id]: (prevCart[item.id] || 0) + 1
            }));
            console.log('Item added to cart');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleRemove = async (item) => {
        if (cart[item.id] > 0) {
            setCart((prevCart) => ({
                ...prevCart,
                [item.id]: prevCart[item.id] - 1
            }));

            try {
                await axios.put(`http://localhost:7777/${userdetails.id}/cart/decrement`, null, {
                    params: { menuItemId: item.id }
                });
                console.log('Item removed from cart');
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        }
    };

    return (
        <div className="diet-menu-container">
            <div className="diet-menu-header">
                <h2>{menu.name}</h2>
                <p>{menu.description}</p>
            </div>

            <div className="diet-menu-list">
                {menu.dietMenu.map((item) => (
                    <div key={item.id} className="diet-menu-item">
                        <div>
                            <h4>{item.name}</h4>
                            <p>Calories: {item.calories}</p>
                            <p>Price: ₹{item.price.toFixed(2)}</p>
                        <div className="cart-controls">
                            {cart[item.id] > 0 ? (
                                <div className="cart-controls">
                                    <button className="decrement-button" onClick={() => handleRemove(item)}>-</button>
                                    <span className="cart-quantity">{cart[item.id]}</span>
                                    <button className="increment-button" onClick={() => handleAdd(item)}>+</button>
                                </div>
                            ) : (
                                <button className="add-to-button" onClick={() => handleAdd(item)}>Add</button>
                            )}
                        </div>
                        </div>
                        {item.menUrl ? (
                            <img src={item.menUrl} alt={item.name} />
                        ) : (
                            <p className="no-image">No image available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
