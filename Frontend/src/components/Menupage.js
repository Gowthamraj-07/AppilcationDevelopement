import React from 'react'
import HotelDetails from './Menu/HotelDetails'
import Menu from './Menu/menu'
import Navbartop from './Home/navbar'
import LoginComponent from './Home/LoginComponent'
import Registerpage from './Home/Registerpage'
import { useContext } from 'react'
import { MyContext } from '../MyContext'
export default function Menupage() {
  const {closelogin,setCloseLogin}=useContext(MyContext)
  const {reg,setReg}=useContext(MyContext)
  return (
    <div>
        <Navbartop/>
        <HotelDetails/>
        <Menu/>
        {closelogin&&<LoginComponent/>}
        {reg&&<Registerpage/>}
    </div>
  )
}
