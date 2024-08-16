import React from 'react'
import Result from './search/result'
import Navbartop from './Home/navbar'
import Footer from './Home/footer'
import LoginComponent from './Home/LoginComponent';
import Registerpage from './Home/Registerpage';
import { useContext } from 'react'
import { MyContext } from '../MyContext';
export default function Searchpage() {
  const { closelogin, reg } = useContext(MyContext);
  return (
    <div>
        <Navbartop/>
        <Result/>
        {closelogin && <LoginComponent />}
      {reg && <Registerpage />}
        <Footer/>
    </div>
  )
}
