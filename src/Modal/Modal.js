import React, { useState, useEffect } from 'react'
import { useModal } from './ModalContext'
import './Modal.css'
import BrowseComics from './BrowseComics'
import YourComics from './YourComics'

const Modal = () => {

  const [activeMenu, setActiveMenu] = useState(0);
  const [activeContent, setActiveContent] = useState([]);

  const {
    handleCloseModal,
    showModal,
  } = useModal()

  //default to the first item in menuContent
  useEffect(() => {
    setActiveContent(menuContent[0])
  }, []);

  //Selecting Menu Function
  const handleSetActive = (index) => {
    setActiveMenu(index);
    setActiveContent(menuContent[index])
  };

  //the array of contents REMEMBER:(the order of the contents must match with the 'menuItems' ) tldr: the arrays must match each other
  const menuContent = [<YourComics/>, <BrowseComics/>]

  //mapping
  const menuItems = ['Your Comics', 'Browse Comics'];
  const menuItemsMap = menuItems.map((item, index) => (
    <li key={index} onClick={() => handleSetActive(index)}>
      {item}
    </li>
  ))

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


