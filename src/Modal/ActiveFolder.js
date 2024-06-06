import React from 'react'
import { useModal } from './ModalContext'

const ActiveFolder = () => {
  const {
    activeFolderContent,
  } = useModal()

  return (

      activeFolderContent

  )
}

export default ActiveFolder