import React, { useState } from 'react'
import logo from './Images/cc-high-resolution-logo-color-on-transparent-background.png'
import dots from './Images/279-removebg-preview.png'
import { useModal } from './Modal/ModalContext'
import { useMediaQuery } from 'react-responsive';

export default function Header() {

  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  const {
    handleOpenModal,
  } = useModal()

  const menuIcon = <svg onClick={() => handleShowPhoneMenu()} style={{ width: '8%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>

  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  const dynamicStyle = () => ({
    position: isPhone ? 'absolute' : 'relative',
    width: '100%',
    border: 'solid red',
    zIndex: '1',
    backgroundColor: '#2653a8',
    display: 'flex',
    justifyContent: 'center',
    animation:'ComicIntro 1s ease 0s 1'
  })

  const handleShowPhoneMenu = () => {
    setShowPhoneMenu(!showPhoneMenu)
  }

  return (
    <div className='headerContainer'>
      <header>
        <img className='dots Top' src={dots} alt='dots' />

        <div className='logoContainer'>
          <p>
            Comic<br />&emsp;&ensp;Corner
          </p>
          <img className='imgLogo' src={logo} alt='sitelogo' />
        </div>

        {isPhone ?
          menuIcon
          :
          <div className='linkContainer'>
            <a className='line' href={'#A'}>Latest Releases</a>
            <a className='line' href={'#B'}>Comic Spotlight</a>
            <a className='line' href={'#C'}>News</a>
            <a onClick={handleOpenModal} className='line' href={'#D'}>Database</a>
          </div>
        }

      </header>

      {showPhoneMenu &&
        <div className='headerContainer' style={dynamicStyle()}>
          <img className='dots Top' src={dots} alt='dots' />

          <div className='linkContainer' style={{ flexDirection: 'column' }}>
            <a className='line' href={'#A'}>Latest Releases</a>
            <a className='line' href={'#B'}>Comic Spotlight</a>
            <a className='line' href={'#C'}>News</a>
            <a onClick={handleOpenModal} className='line' href={'#D'}>Database</a>
          </div>

        </div>
      }
    </div>
  )
}
