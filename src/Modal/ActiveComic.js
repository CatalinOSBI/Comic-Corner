import React from 'react'
import { useModal } from './ModalContext'

const ActiveComic = () => {

  const {
    activeComicContent,
  } = useModal()

  return (
    <div>
      {activeComicContent}
    </div>
  )
}

export default ActiveComic