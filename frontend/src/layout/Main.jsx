import React from 'react'
import Navbar from '../components/Home/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Home/Footer'

const Main = () => {
  return (
    <div>
      <Navbar/>
      <div className='min-h-screen'>
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Main
