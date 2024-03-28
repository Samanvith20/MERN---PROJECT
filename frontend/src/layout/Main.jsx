import React from 'react'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Home/Footer'

const Main = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
