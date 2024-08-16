import React, { useContext, useState } from 'react';
import './LoginComponent.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Import Axios
import { MyContext } from '../../MyContext';
import { colors } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router';
  const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate=useNavigate();
  const { adminlogin, setAdminlogin } = useContext(MyContext);
  const { usercompoent,setUsercomponent} = useContext(MyContext);
  const [invalidLogin,setInvalidLogin]=useState(false)
  const [border,setBorder]=useState("#ddd")
  function handleClose() {
    setAdminlogin(false);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Hardcoded email and password check
    const hardcodedEmail = 'gowthamskcet@gmail.com';
    const hardcodedPassword = '123';
  
    if (formData.email === hardcodedEmail && formData.password === hardcodedPassword) {
      // Simulate successful login
      toast.success('Login Success', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/admin')
      setAdminlogin(false);
      
    } else {
      toast.error('Invalid Login!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setBorder("red");
      setInvalidLogin(true);
      console.log('Invalid email or password');
    }
  };
  
  return (
    <div className="login-modal">
      <div className="login-content">
        <div className="closelogin">
          <h2>Admin Login</h2>
          <CloseIcon onClick={handleClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={{borderColor: `${border}`,borderRadius:'5px' }}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ marginTop: '10px',borderColor: `${border}`,borderRadius:'5px' }}
            />
         {invalidLogin&&<p style={{color:"red",fontSize:"15px",margin:"5px 0 0 5px"}}>Email or password is invalid!</p>}
          </div>
          <button type="submit" className="otp-button">Log in</button>
        </form>
        
      </div>
      
    </div>
  );
};

export default AdminLogin;
