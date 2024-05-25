import React from 'react'
import { useModal } from './ModalContext'

const ActiveFolder = () => {
  const {
    activeFolderContent,
  } = useModal()

  return (
    <div>
      {activeFolderContent}
    </div>
  )
}

export default ActiveFolder