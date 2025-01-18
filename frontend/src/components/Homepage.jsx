import React from 'react'
import AstrologyForm from './AstrologyForm'
import NavBar from './Navbar'

const Homepage = () => {
  return (
    <>
        <NavBar />
        <div className='min-h-screen w-full flex bg-orange-300'>
            <AstrologyForm />
        </div>
    </>
  )
}

export default Homepage
