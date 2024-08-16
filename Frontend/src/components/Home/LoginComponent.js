import React, { useContext, useState } from 'react';
import './LoginComponent.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Import Axios
import { MyContext } from '../../MyContext';
import { colors } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { closelogin, setCloseLogin } = useContext(MyContext);
  const {  userdetails, setUserdetails } = useContext(MyContext);
  const { reg, setReg } = useContext(MyContext);
  const { usercompoent,setUsercomponent} = useContext(MyContext);
  const [invalidLogin,setInvalidLogin]=useState(false)
  const [border,setBorder]=useState("#ddd")
  function handleClose() {
    setCloseLogin(false);
  }

  function handleReg() {
    setReg(true);
    setCloseLogin(false);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:7777/api/getusers');
      const users = response.data;
      const user = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
  
      if (user) {
        try {
          await axios.post('http://localhost:7777/login', user);
          
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
          
          setUsercomponent(false);
          setUserdetails(user);
          console.log('Login successful:', user);
          setCloseLogin(false);
  
          
        } catch (error) {
          console.error('Error posting form data:', error);
        }
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
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  return (
    <div className="login-modal">
      <div className="login-content">
        <div className="closelogin">
          <h2>Login</h2>
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
        <div className="or-divider">OR</div>
        <button className="google-button">Sign in with Google</button>
        <div className="signup-link">
          <span>New to EatEase?</span> <p style={{color:'red',cursor:'pointer'}} onClick={handleReg}>Create an account?</p>
        </div>
      </div>
      
    </div>
  );
};

export default LoginComponent;
