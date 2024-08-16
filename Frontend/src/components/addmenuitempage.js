import React from 'react'
import AddMenuItem from './Addhotel/addmenuitem'
import Navbartop from './Home/navbar'
import Footer from './Home/footer'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
export default function Addmenuitempage() {
  return (
    <div>
      <Navbar>
       <Navbar.Brand style={{ paddingLeft: '50px', fontSize: '30px' }}>
          <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>EatEase</Link>
        </Navbar.Brand>
       
        </Navbar>
         <h1 style={{ marginBottom: '50px', backgroundColor: '#d3d3d3',padding:'20px' }}>Admin Panel</h1>
        <AddMenuItem/>

    </div>
  )
}
