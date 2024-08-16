import React from 'react'
import { Link } from 'react-router-dom'
import AddHotel from '../Addhotel/addhotel'
export default function AdminHome() {
  return (
    <div style={{margin:'30px'}}>
        <AddHotel/>
        <div style={{marginTop:'30px'}}>
        <Link to='/addmenu'>Add MenuItem In Existing Restratunt</Link>
        </div>
    </div>
  )
}
