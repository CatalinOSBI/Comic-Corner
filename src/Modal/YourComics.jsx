import React, { useState} from 'react'
import './Modal.css'
import { useModal } from './ModalContext';

const YourComics = () => {

  const [showNameFolder, setShowNameFolder] = useState(false);
  const [dynamicOpacity, setDynamicOpacity] = useState(1);

  const folderIconAdd = <svg style={{opacity:dynamicOpacity, transition:'all .218s'}} onClick={() => handleShowAddName()} className='folderIconAdd' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#74a3eb" d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" /></svg>

  const {
    folderNameRef,
    handleUpdate,
    modalFolders,
  } = useModal()

  const handleHideAddName = () => {
    
    setShowNameFolder(false)
    setDynamicOpacity(0)
    setTimeout(() => {
      setDynamicOpacity(1)
    }, 100);
    
  }

  const handleShowAddName = () => {
    
    setShowNameFolder(true)
    setDynamicOpacity(0)
    setTimeout(() => {
      setDynamicOpacity(1)
    }, 100);
    
  }

  //StorageUpdate
  const handleStorageUpdate = () => {
    const update = {
      ComicFolders: []
    }
    localStorage.setItem('Comic Folders', JSON.stringify(update))
  }

  const test= import.meta.env.VITE_APP_1

  return (
    <>
      {modalFolders}

      <div className='modalFolderWrapper' >
        <div className='modalFolder' title='Add Folder' >

          {showNameFolder ? (
            <>
              <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', opacity: dynamicOpacity, transition:'all .218s', padding:'1rem'}}>
                <input style={{ width: '98.2%' }} autoComplete='off' className='modalTextInput' id='folderName' name='folderName' placeholder='Folder Name' type='text' ref={folderNameRef} />
                {/* <button onClick={handleStorageUpdate}>Storage</button> */}

                <div className='folderButtonsContainer' >
                  <button className='folderButton' onClick={()=>handleHideAddName()} style={{backgroundColor:'white', color:'#3371e6', border:'1px solid #3371e6'}}>Cancel</button>
                  <button className='folderButton' onClick={()=>handleUpdate(setShowNameFolder)}>Confirm</button>
                </div>
              </div>
            </>
          ) : (

            folderIconAdd
            
          )}

        </div>
      </div>

    </>
  )
}

export default YourComics