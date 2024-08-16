import React from 'react';
import AdminHome from './adminpanel/home';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
export default function Adminhomepage() {
  return (
    <div>
        <Navbar>
       <Navbar.Brand style={{ paddingLeft: '50px', fontSize: '30px' }}>
          <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>EatEase</Link>
        </Navbar.Brand>
       
        </Navbar>
      <h1 style={{ marginBottom: '50px', backgroundColor: '#d3d3d3',padding:'20px' }}>Admin Panel</h1>
      <AdminHome />
    </div>
  );
}
