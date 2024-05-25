import React, { useEffect, useState, useRef } from 'react'
import './Modal.css'
import { useModal } from './ModalContext';

const YourComics = () => {

  const {
    comicFolders,
    folderNameRef,
    handleUpdate,
    modalFolders,
    menuContent,
    setActiveContent,
  } = useModal()


  //StorageUpdate
  const handleStorageUpdate = () => {
    const update = {
      ComicFolders: []
    }
    localStorage.setItem('Comic Folders', JSON.stringify(update))
  }

  //Log
  const handleLog = () => {
    console.log(comicFolders.ComicFolders[0].test[0].author)
  }

  return (
    <>
      {modalFolders}

      <div className='modalFolder' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <button onClick={handleUpdate}>Add Folder</button>
        <button onClick={handleStorageUpdate}>Storage</button>
        <button onClick={handleLog}>Log</button>
        <input id='folderName' name='folderName' placeholder='Folder Name' type='text' ref={folderNameRef} />
      </div>

    </>
  )
}

export default YourComics