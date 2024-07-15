import React, { useState, useEffect } from 'react'
import logo from './Images/cc-high-resolution-logo-color-on-transparent-background.png'
import dots from './Images/279-removebg-preview.png'
import { useModal } from './Modal/ModalContext'
import { useMediaQuery } from 'react-responsive';

export default function Header() {

  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const [dynamicAnimation, setDynamicAnimation] = useState();
  const [menuIcon, setmenuIcon] = useState();

  const {
    handleOpenModal,
  } = useModal()
  
  useEffect(() => {

    const handleShowPhoneMenu = () => {

      if (showPhoneMenu === true) {
        setDynamicAnimation('MenuUnactive .518s ease 0s 1')

        setTimeout(() => {
          setShowPhoneMenu(false)
        }, 458);
      } else {
        setDynamicAnimation('MenuActive .518s ease 0s 1')
        setShowPhoneMenu(true)
      }
    }

    if (showPhoneMenu === false) {
      setmenuIcon(<svg onClick={() => handleShowPhoneMenu()} style={{ width: '8%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>)
    } else {
      setmenuIcon(<svg onClick={() => handleShowPhoneMenu()} style={{ width: '6%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>)
    }

  }, [showPhoneMenu]);

  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  const dynamicStyle = () => ({
    position: isPhone ? 'absolute' : 'relative',
    width: '100%',
    zIndex: '1',
    backgroundColor: '#2653a8',
    display: 'flex',
    justifyContent: 'center',
    animation: dynamicAnimation
  })

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
            <a onClick={handleOpenModal} className='line'>Your Comics</a>
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
            <a onClick={handleOpenModal} className='line'>Your Comics</a>
          </div>

        </div>
      }
    </div>
  )
}
