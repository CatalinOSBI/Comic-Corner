import React from 'react'
import { useModal } from './ModalContext'

const ActiveComic = () => {

  const {
    activeComicContent,
  } = useModal()

  return (

      activeComicContent

  )
}

export default ActiveComic