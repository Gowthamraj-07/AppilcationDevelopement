import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../../MyContext';
import { toast } from 'react-toastify';
const OrderDetails = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const { userdetails } = useContext(MyContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/api/orders/user/${userId}`);
        const orders = response.data;
        setOrders(orders);

        const menuItemIds = new Set();
        orders.forEach(order => {
          Object.keys(order.items).forEach(menuItemId => menuItemIds.add(menuItemId));
        });

        const fetchMenuItems = async () => {
          const menuItemsData = {};
          await Promise.all(Array.from(menuItemIds).map(async id => {
            const menuItemResponse = await axios.get(`http://localhost:7777/menu/${id}`);
            menuItemsData[id] = menuItemResponse.data;
          }));
          setMenuItems(menuItemsData);
        };

        fetchMenuItems();

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:7777/api/orders/cancel/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      toast.warn('Order Cancelled.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Order Details</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.order}>
            <h3 style={styles.orderHeader}>Order Id: {order.id} - {order.hotel.hotelName}</h3>
            <p style={styles.orderDate}>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p style={styles.totalPrice}>Total Price: ₹{order.totalPrice}</p>

            <ul style={styles.itemsList}>
              {Object.entries(order.items).map(([menuItemId, count]) => {
                const menuItem = menuItems[menuItemId];
                return menuItem ? (
                  <li key={menuItemId} style={styles.menuItem}>
                    <img src={menuItem.imageUrl} alt={menuItem.name} style={styles.image} />
                    <div style={styles.itemDetails}>
                      <p style={styles.itemName}>{menuItem.name} (x{count})</p>
                      <p style={styles.itemPrice}>₹{menuItem.price}</p>
                      <p style={styles.itemDescription}>{menuItem.description}</p>
                    </div>
                  </li>
                ) : (
                  <li key={menuItemId} style={styles.loadingItem}>Loading item details...</li>
                );
              })}
            </ul>

            <button style={styles.cancelButton} onClick={() => handleCancelOrder(order.id)}>
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  noOrders: {
    textAlign: 'center',
    color: '#999',
  },
  order: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  orderDate: {
    fontSize: '14px',
    color: '#555',
  },
  totalPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#111',
    marginTop: '10px',
  },
  itemsHeader: {
    fontSize: '18px',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#444',
  },
  itemsList: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '5px',
    marginRight: '15px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '5px',
  },
  itemDescription: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
  },
  loadingItem: {
    color: '#999',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
  },
};

export default OrderDetails;
