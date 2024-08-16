import React, { useContext, useState } from 'react';
import './LoginComponent.css';
import CloseIcon from '@mui/icons-material/Close';
import { MyContext } from '../../MyContext';
import axios from 'axios';

const Registerpage = () => {
    const { closelogin, setCloseLogin } = useContext(MyContext);
    const { username, setUsername } = useContext(MyContext);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        number: '',
        address: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: false,
        number: false
    });
    const { reg, setReg } = useContext(MyContext);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleClose() {
        setReg(false);
    }

    const checkUserExistence = async () => {
        try {
            const response = await axios.get('http://localhost:7777/checkUser', {
                params: {
                    email: formData.email,
                    number: formData.number
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return {};
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const existenceResults = await checkUserExistence();
        const emailExists = existenceResults.email;
        const numberExists = existenceResults.number;
        console.log(emailExists)
        console.log(numberExists)

        setFormErrors({
            email: emailExists,
            number: numberExists
        });

        if (emailExists && numberExists) {
            alert("A user with this email and phone number already exists.");
            return;
        }
        if(emailExists)
        {
          alert("A user with this email already exists.")
          return;
        }
        if(numberExists)
        {
          alert("A user with this Phone number already exists.")
          return;
        }

        try {
            const response = await axios.post('http://localhost:7777/api/postusers', formData);
            console.log(response.data);
            setReg(false);
            setCloseLogin(true);
            alert("Registered! Login Now");
        } catch (error) {
            console.error('Error posting form data:', error);
        }
    };

    function handleAlreadyuser() {
        setCloseLogin(true);
        setReg(false);
    }

    return (
        <div className="login-modal">
            <div className="login-content">
                <div className='closelogin'>
                    <h2>Register</h2>
                    <CloseIcon onClick={handleClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="phone" style={{ marginTop: '10px' }}>+91</label>
                        <input
                            type="tel"
                            id="number"
                            name='number'
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Phone"
                            required
                            maxLength="10"
                            style={{ border: formErrors.number ? '1px solid red' : '1px solid #ccc' }}
                        />
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            style={{ marginTop: '10px', border: formErrors.email ? '1px solid red' : '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            name='userName'
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            style={{ marginTop: '10px' }}
                        />
                        <input
                            type="text"
                            id="address"
                            placeholder="Address"
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={{ marginTop: '10px' }}
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <button type="submit" className="otp-button">Register</button>
                </form>
                <div className="or-divider">OR</div>
                <button className="google-button">Sign up with Google</button>
                <div className="signup-link">
                    <span>Already an user?</span> <a style={{ color: 'red', cursor: 'pointer' }} onClick={handleAlreadyuser}>Login Now!</a>
                </div>
            </div>
        </div>
    );
};

export default Registerpage;
