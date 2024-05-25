import React, { useState, useEffect } from 'react'
import { useModal } from './ModalContext'
import './Modal.css'

const Modal = () => {

  const {
    handleCloseModal,
    showModal,
    menuItemsMap,
    activeContent,
  } = useModal()

  //remove overflow when modal is open
  if (showModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button style={{ position: 'absolute', top: '-22px', zIndex:'2000' }} onClick={handleCloseModal}>X</button>

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


