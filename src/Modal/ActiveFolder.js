import React from 'react'
import { useModal } from './ModalContext'
import dots from '../Images/279-removebg-preview.png'

const ActiveFolder = () => {
  const {
    activeFolderContent,
    setActiveContent,
    menuContent,
    arrowIcon,
  } = useModal()

  return (
    <>
      <div style={{ position: 'relative', marginBottom: '-14px' }} className='activeComicFloatingText'>{arrowIcon} <p onClick={() => setActiveContent(menuContent[0])} className='title'>Go Back</p></div>
      {activeFolderContent}

      {/* Render Images */}
      <div>
        <img style={{ zIndex: '-1', opacity: '4%' }} className='dots Bottom' src={dots} alt='dots' />
        <img style={{ zIndex: '-1', opacity: '4%' }} className='dots Top' src={dots} alt='dots' />
      </div>
    </>
  )
}

export default ActiveFolder