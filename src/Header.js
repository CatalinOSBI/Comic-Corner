import React from 'react'
import logo from './Images/cc-high-resolution-logo-color-on-transparent-background.png'
import dots from './Images/279-removebg-preview.png'

export default function Header() {

  const handleShowModal = () => { 
    alert('Incoming Database Update!')
   }

  return (
    <div className='headerContainer'>
      <header>
        <img className='dots Top' src={dots} alt='dots'/>
        <div className='logoContainer'>
          <p>
            Comic<br/>&emsp;&ensp;Corner
          </p>
          <img className='imgLogo' src={logo} alt='sitelogo'/>
        </div>
        <div className='linkContainer'>
          <a className='line' href={'#A'}>Latest Releases</a> 
          <a className='line' href={'#B'}>Comic Spotlight</a>
          <a className='line' href={'#C'}>News</a>
          <a onClick={handleShowModal} className='line'>Database</a>
        </div>
      </header>
    </div>
  )
  }
