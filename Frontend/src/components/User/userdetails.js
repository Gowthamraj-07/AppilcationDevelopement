import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './userdetails.css';
import OrderDetails from './Orders';
import { toast } from 'react-toastify';
export default function User() {
  const { userdetails, setUserdetails } = useContext(MyContext);
  const { setUsercomponent } = useContext(MyContext);
  const navigate = useNavigate();
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userdetails, password: null });
  const [newPassword, setNewPassword] = useState('');
  const [activeSection, setActiveSection] = useState('account');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState(null);

  console.log(userdetails.password)
  function logout() {
    setUsercomponent(true);
    setUserdetails("");
    toast.warn('Logged Out', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     
      });
    localStorage.setItem('usercomponent', JSON.stringify(true));
    localStorage.removeItem('userdetails');
    navigate('/');
  }

  function handleEditAccount() {
    setIsEditingAccount(true);
  }

  function handleEditAddress() {
    setIsEditingAddress(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  }

  function handlePasswordChange(e) {
    setNewPassword(e.target.value);
  }

  async function handleSave() {
    try {
        // Keep the existing password if it's not being changed
        const updatedDetails = { ...editedDetails };
        if (!isChangingPassword) {
            updatedDetails.password = userdetails.password;
        }

        const response = await axios.put(`http://localhost:7777/api/editusers/${editedDetails.id}`, updatedDetails);
        setUserdetails(response.data); // Update the user details with the response from the server
        setIsEditingAccount(false);
        setIsEditingAddress(false);
        localStorage.setItem('userdetails', JSON.stringify(response.data));
        toast.success('Details Updated!', {
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
        console.error('Error updating user details:', error);
        // Handle error accordingly
    }
}


  async function handleChangePassword() {
    if (editedDetails.password !== userdetails.password) {
      toast.error('Old password does not match', {
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
      const response = await axios.put(`http://localhost:7777/api/editusers/${editedDetails.id}`, {
        ...editedDetails,
        password: newPassword
      });
      setUserdetails(response.data); // Update the user details with the response from the server
      setIsChangingPassword(false);
      toast.success('Password Changed!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        });
        setActiveSection('account')
    } catch (error) {
      console.error('Error changing password:', error);
      // Handle error accordingly
    }
  }

 
  function renderSection() {
    if (activeSection === 'account') {
      return (
        <>
          <h3>Account Information</h3>
          <p className="required-fields">* Required Fields</p>
          <div className="details-form">
            <div className="form-group">
              <label>User Name *</label>
              {isEditingAccount ? (
                <input
                  type="text"
                  name="userName"
                  value={editedDetails.userName}
                  onChange={handleChange}
                />
              ) : (
                <span>{userdetails.userName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email Address</label>
              {isEditingAccount ? (
                <input
                  type="email"
                  name="email"
                  value={editedDetails.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{userdetails.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <span>{userdetails.number}</span>
            </div>
            
            {isEditingAccount ? (
              <button className="save-button" onClick={handleSave}>Save</button>
            ) : (
              <button className="edit-button" onClick={handleEditAccount}>Edit</button>
            )}
          </div>
        </>
      );
    } else if (activeSection === 'orders') {
        return(

            <OrderDetails userId={userdetails.id}/>
        )
    } else if (activeSection === 'address') {
      return (
        <div>
          <h3>Address Book</h3>
          <div className="details-form">
            <div className='form-group'>
              <label>Home Address</label>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="address"
                  value={editedDetails.address}
                  onChange={handleChange}
                />
              ) : (
                <p>{userdetails.address}</p>
              )}
            </div>
            {isEditingAddress ? (
              <button className="save-button" onClick={handleSave}>Save</button>
            ) : (
              <button className="edit-button" onClick={handleEditAddress}>Edit</button>
            )}
          </div>
        </div>
      );
    } else if (activeSection === 'password') {
      return (
        <div>
          <h3>Change Password</h3>
          <div className="details-form">
            <div className='form-group'>
              <label>Old Password</label>
              <input
                type="password"
                name="password"
                value={editedDetails.password}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="save-button" onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="account-container">
      <div className="sidebar">
        <h2>Hello {userdetails.userName}</h2>
        <ul className="sidebar-menu">
          <li className={activeSection === 'account' ? 'active' : ''} onClick={() => setActiveSection('account')}>Account Information</li>
          <li className={activeSection === 'orders' ? 'active' : ''} onClick={() => setActiveSection('orders')}>My Orders</li>
          <li className={activeSection === 'address' ? 'active' : ''} onClick={() => setActiveSection('address')}>Address Book</li>
          <li className={activeSection === 'password' ? 'active' : ''} onClick={() => setActiveSection('password')}>Change Password</li>
          <li onClick={logout}>Log Out</li>
        </ul>
      </div>
      <div className="account-details">
        {renderSection()}
      </div>
    </div>
  );
}
