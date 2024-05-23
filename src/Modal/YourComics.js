import React, { useEffect, useState, useRef } from 'react'
import './Modal.css'

const YourComics = () => {
  const [comicFolders, setComicFolders] = useState(JSON.parse(localStorage.getItem('Comic Folders')));
  const folderNameRef = useRef()

  //Update LocalStorage whenever the state changes
  useEffect(() => {

    localStorage.setItem('Comic Folders', JSON.stringify(comicFolders))

  }, [comicFolders]);

  //Mapping for Folders and Comics inside the Folders
  const modalFolders = comicFolders.ComicFolders.map((folder, folderIndex) => {
    //Folder Name
    const folderName = Object.keys(folder)[0]
    //Comic Mapping
    const modalComics = folder[folderName].map((comic, comicIndex) => (
      <div key={comicIndex}>
        <p>{comic.title} - Title</p>
      </div>
    ))
    //Rendering
    return (
      <div key={folderIndex} className='modalFolder'>
        <p>{folderName}</p>
        <p>{folderIndex}</p>

        {modalComics}

      </div>
    );
  });
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
      ComicFolders: []
    }

    localStorage.setItem('Comic Folders', JSON.stringify(update))
  }

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