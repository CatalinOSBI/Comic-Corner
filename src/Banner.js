import React from 'react'
import banner from './Images/705204.jpg'

export default function Banner() {
  return (
    <>
    <div className='mainContainer'>
        <div className='effectContainer' >
            <h1></h1>
            <div className='bannerContainer'>
                <img className='banner' src={banner} alt='banner'/>
            </div>       
        </div>
        <h1 style={{opacity: '0', fontSize: '2.5rem'}}>Title</h1>
    </div>
    
    </>
  )
}
