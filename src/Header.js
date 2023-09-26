import React from 'react'
import logo from './cc-high-resolution-logo-color-on-transparent-background.png'

export default function Header() {
  return (
    <header>
      <div className='logoContainer'>
        <p>
          Comic<br/>&emsp;&ensp;Corner
        </p>
        <img className='imgLogo' src={logo} alt='sitelogo'/>
      </div>
      <div className='linkContainer'>
        <a className='line'>Latest Releases</a>
        <a className='line'>Comic Spotlight</a>
        <a className='line'>News</a>
      </div>
    </header>
  )
}
