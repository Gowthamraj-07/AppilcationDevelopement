import React from 'react'
import DietMenu from './dietdetials/dietMenu'
import Navbartop from './Home/navbar'
import Footer from './Home/footer'

export default function Dietmenupage() {
  return (
    <div>
      <Navbartop/>
        <DietMenu/>
        <Footer/>
    </div>
  )
}
