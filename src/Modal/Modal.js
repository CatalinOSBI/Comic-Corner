import React, { useRef } from 'react'
import { useModal } from './ModalContext'
import './Modal.css'
import { useMediaQuery } from 'react-responsive';

const Modal = () => {

  const {
    handleCloseModal,
    showModal,
    menuItemsMap,
    activeContent,
    activeMenu,
  } = useModal()

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  //remove overflow when modal is open
  if (showModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  const buttonDynamicStyling = () => ({
    transform:  isPhone && activeMenu === 1  ? 'translateY( -9.5vh)' : activeMenu === 1 ? 'translateY( -375%)' : 'translateY( -95%)'
  })

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button style={buttonDynamicStyling()} className='closeModalButton' onClick={handleCloseModal}><p>X</p></button>

            <ul className='modalList'>
              {menuItemsMap}
            </ul>

            <div className='modalContent'>

              {activeContent}

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal


