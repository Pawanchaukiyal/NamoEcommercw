import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

// When you wrap the layout in page,the footer and navbar is constant except between content--like about,homepage
const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div className='main-content min-h-screen'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout