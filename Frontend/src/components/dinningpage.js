import React from 'react'
import TableBooking from './Dinning/tablebook'
import TabSlider from './Dinning/tabSlider'
import Navbartop from './Home/navbar'
import Footer from './Home/footer'
import { useContext } from 'react'
import { MyContext } from '../MyContext';
import LoginComponent from './Home/LoginComponent'
import Registerpage from './Home/Registerpage'
export default function Dinningpage() {
  const {closelogin,setCloseLogin}=useContext(MyContext)
  const {reg,setReg}=useContext(MyContext)
  return (
    <div>
        <Navbartop/>
        <TableBooking/>
        <TabSlider/>
        <Footer/>
        {closelogin && <LoginComponent />}
      {reg && <Registerpage />}
    </div>
  )
}
