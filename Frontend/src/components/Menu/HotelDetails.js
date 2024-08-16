import React, { useContext } from 'react'
import { MyContext } from '../../MyContext'
import './HotelDetails.css'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StarsIcon from '@mui/icons-material/Stars';
export default function HotelDetails() {
    const {menu,setMenu}=useContext(MyContext)
    console.log(menu.menuItems)
    return (
      <div className="welcomcafe">
        <div className="content">
          <div className="main-image">
            <img src={menu.hotelUrl} alt="WelcomCafe Kovai" />
          </div> 
          <div className="details">
            <h1>{menu.hotelName}</h1>
            <p><StarsIcon style={{color:'green',fontSize:"20px",marginRight:'5px'}}/>{menu.rating}</p>
            <p>{menu.style}</p>
            <p>{menu.hotelLocation}</p>
            <div className="actions">
              <button><BookmarkAddIcon style={{margin:'0 3px'}}/>Favorite</button>
            </div>
          </div>
          
        </div>
      </div>
    );
}
