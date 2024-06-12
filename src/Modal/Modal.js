import React, { useRef } from 'react'
import { useModal } from './ModalContext'
import './Modal.css'

const Modal = () => {

  const {
    handleCloseModal,
    showModal,
    menuItemsMap,
    activeContent,
  } = useModal()

  const testRef = useRef()

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

            <button className='closeModalButton' onClick={handleCloseModal}><p>X</p></button>

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


