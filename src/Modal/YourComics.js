import React, { useEffect, useState, useRef } from 'react'
import './Modal.css'

const YourComics = () => {
  const [comicFolders, setComicFolders] = useState(JSON.parse(localStorage.getItem('Comic Folders')));
  const folderNameRef = useRef()

  //Update LocalStorage whenever the state changes
  useEffect(() => {

    localStorage.setItem('Comic Folders', JSON.stringify(comicFolders))

  }, [comicFolders]);

  //Mapping for modalFolders
  const modalFolders = comicFolders.ComicFolders.map((item, index) => (
    <div key={index} className='modalFolder'>
      <p>{index}</p>
    </div>
  ));

  //Update
  const handleUpdate = () => {
    let folderName = folderNameRef.current.value;
  
    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: [
        ...prev.ComicFolders,
        {
          [folderName]: [
            {
              image: 'A',
              title: 'A',
              author: 'A',              //GUTS AND GLORY
              description: 'A',
            },
          ],
        },
      ],
    }));
  };

  //Update
  const handleStorageUpdate = () => {

    const update = {
      ComicFolders:[]
    }

    localStorage.setItem('Comic Folders', JSON.stringify(update))
  }

  return (
    <>
      {modalFolders}

      <div className='modalFolder' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <button onClick={handleUpdate}>Add Folder</button>
        <button onClick={handleStorageUpdate}>Storage</button>
        <button onClick={() => { console.log(comicFolders) }}>Log</button>
        <input id='folderName' name='folderName' placeholder='Folder Name' type='text' ref={folderNameRef} />
      </div>


    </>
  )
}

export default YourComics