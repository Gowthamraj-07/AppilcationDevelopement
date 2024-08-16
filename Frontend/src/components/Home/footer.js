import React, { useContext } from 'react';
import './Footer.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import { MyContext } from '../../MyContext';
const Footer = () => {
    const { adminlogin,setAdminlogin } = useContext(MyContext)
     function handleOpen()
     {
        setAdminlogin(true);
     }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-services">
                    <h4>Our Services</h4>
                    <ul>
                        <li>Food Delivery</li>
                        <li>Restaurant Reservations</li>
                        <li>Catering Services</li>
                        <li>Online Ordering</li>
                        <li>Gift Cards</li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <p onClick={handleOpen}>Admin login</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} EatEase. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
