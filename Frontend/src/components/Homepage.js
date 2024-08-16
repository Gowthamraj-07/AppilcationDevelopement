import React, { useContext } from 'react';
import Navbartop from './Home/navbar';
import Header from './Home/Header';
import Onmind from './Home/onmind';
import Hotels from './Home/Hotels';
import LoginComponent from './Home/LoginComponent';
import { MyContext } from '../MyContext';
import Registerpage from './Home/Registerpage';
import Footer from './Home/footer';
import OptionSelector from './Home/optionselector';
import DinningHotels from './Home/dinningHotel';
import SpeechToText from './Home/voice';
import { useOutlet } from 'react-router';
import Diets from './Home/diet';
import AdminLogin from './Home/adminlogin';
export default function Homepage() {
  const { closelogin, reg,adminlogin } = useContext(MyContext);
  const {option}=useContext(MyContext)
  const {dietoption}=useContext(MyContext)
  return (
    <div>
      <Navbartop />
      <Header />
      <OptionSelector/>
      <Onmind />
      {!dietoption&&<Hotels />}
      {dietoption&&<Diets />}
      {closelogin && <LoginComponent />}
      {adminlogin && <AdminLogin />}
      {reg && <Registerpage />}
      <Footer />
     
    </div>
  );
}
