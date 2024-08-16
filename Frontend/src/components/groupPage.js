import React, { useContext } from 'react'
import { MyContext } from '../MyContext';
import GroupChatComponent from './Group/chat'
import Navbartop from './Home/navbar';
import Footer from './Home/footer';
import LoginComponent from './Home/LoginComponent';
import Registerpage from './Home/Registerpage';
export default function GroupPage() {
  const {closelogin,setCloseLogin}=useContext(MyContext)
  const {reg,setReg}=useContext(MyContext)
  return (
    <div>
        <Navbartop/>
        <GroupChatComponent/>
        {closelogin && <LoginComponent />}
      {reg && <Registerpage />}
        <Footer/>
    </div>
  )
}
