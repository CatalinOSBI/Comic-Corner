import React from 'react'
import { useModal } from './ModalContext'
import dots from '../Images/279-removebg-preview.png'

const ActiveFolder = () => {
  const {
    activeFolderContent,
  } = useModal()

  return (
    <>
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