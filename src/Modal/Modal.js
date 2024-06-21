import React from 'react'
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
    menuContent,
  } = useModal()

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})


  //remove overflow when modal is open
  if (showModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  const buttonDynamicStyling = () => ({
    transform:  isPhone && activeContent.type.name === 'BrowseComics'  ? 'translateY( -9.5vh)' : activeContent.type.name === 'BrowseComics' ? 'translateY( -375%)' : 'translateY( -95%)'
  })

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button style={buttonDynamicStyling()} className='closeModalButton' onClick={handleCloseModal}><p>X</p></button>
            <button onClick={()=>   console.log('activeContent', activeContent, 'activeMenu', activeMenu , 'menuContent', menuContent)}>TEST</button>

            <ul className='modalList'>
              {menuItemsMap}
            </ul>

            <div className='modalContent' style={{gap: activeContent.type.name === 'ActiveComic' ? '0px' : ''}}>

              {activeContent}

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal


