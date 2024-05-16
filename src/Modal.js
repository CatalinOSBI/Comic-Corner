import React from 'react'
import { useModal } from './ModalContext'
import './Modal.css'

const Modal = () => {

  const {
    handleCloseModal,
    showModal,
  } = useModal()

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button onClick={handleCloseModal}>X</button>
            <p style={{fontSize:'3rem'}}>BROWSE COMICS</p>

          </div>
        </div>
      }
    </>
  )
}


export default Modal


