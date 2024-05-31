import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import YourComics from './YourComics';
import BrowseComics from './BrowseComics';
import ActiveFolder from './ActiveFolder';
import ActiveComic from './ActiveComic';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false);
  const [comicFolders, setComicFolders] = useState(JSON.parse(localStorage.getItem('Comic Folders')));
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeContent, setActiveContent] = useState([0]);
  const [activeFolderContent, setActiveFolderContent] = useState([]);
  const [activeComicContent, setActiveComicContent] = useState([]);
  const folderNameRef = useRef()
  const selectorFolderNameRef = useRef()

  const folderIcon = <svg className='folderIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#74a3eb" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
  const dotsIcon = <svg className='dotsIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path fill="#74a3eb" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
  /////////////////////////////////////////
  //              Side Menu              //
  /////////////////////////////////////////

  //default to the first item in menuContent
  useEffect(() => {
    setActiveContent(menuContent[0])
  }, []);

  //Selecting Menu Function
  const handleSetActive = (index) => {
    setActiveMenu(index);
    setActiveContent(menuContent[index])
  };

  //the array of contents REMEMBER:(the order of the contents must match with the 'menuItems' ) tldr: the arrays must match each other
  const menuContent = [<YourComics />, <BrowseComics />, <ActiveComic />, <ActiveFolder />]

  //mapping
  const menuItems = ['Your Comics', 'Browse Comics', 'ActiveComic', 'ActiveFolder'];
  const menuItemsMap = menuItems.map((item, index) => (
    <li key={index} onClick={() => handleSetActive(index)}>
      {item}
    </li>
  ))

  /////////////////////////////////////////
  //           Folders/Comics            //
  /////////////////////////////////////////

  //Update LocalStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('Comic Folders', JSON.stringify(comicFolders))

  }, [comicFolders]);

  //Update (Add new Folder)
  const handleUpdate = () => {
    let folderName = folderNameRef.current.value;

    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: [
        ...prev.ComicFolders,
        {
          [folderName]: [
            {
              image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/663e5c3e3070c.jpg',
              title: 'Ghost Rider: Final Vengeance (2024) #3',
              writer: 'Benjamin Percy',              //GUTS AND GLORY
              description: `THE HOOD BRINGS THE HELLFIRE! The new Ghost Rider plans his bloody takeover of Chicago's criminal underworld! Will Johnny Blaze be able to claw his way back from the brink of death to reclaim the Spirit of Vengeance?`,
            },
            {
              image: 'http://i.annihil.us/u/prod/marvel/i/mg/9/40/664b9dcb42c24.jpg',
              title: 'Spider-Punk: Arms Race (2024) #4',
              writer: 'Benjamin Percy',
              description: `THE HOOD BRINGS THE HELLFIRE! The new Ghost Rider plans his bloody takeover of Chicago's criminal underworld! Will Johnny Blaze be able to claw his way back from the brink of death to reclaim the Spirit of Vengeance?`,
            },
          ],
          id: prev.ComicFolders.length, //id of the folder
        },
      ],
    }));
  };

  //Add Comic To Folder
  const handleAddToFolder = (comicImage, comicTitle, comicDesc, folderName) => {

    setComicFolders((prev) => {
      // Find the folder to update
      const updatedFolders = prev.ComicFolders.map((folder) => {
        if (folder[folderName]) {
          return {
            ...folder,
            [folderName]: [
              ...folder[folderName],
              {
                image: comicImage,
                title: comicTitle,
                writer: 'writer',
                description: comicDesc,
              },
            ],
          };
        }
        return folder
      })

      return {
        ...prev,
        ComicFolders: updatedFolders,
      }
    })

  }


  //GoTo Active Folder Content
  const handleGoToActiveFolder = (folderContent) => {
    //Go to the last item in the array(because ActiveFolder is always the last item in the array)
    setActiveContent(menuContent[menuContent.length - 1])
    setActiveFolderContent(folderContent)
    console.log(folderContent)
  }

  //GoTo Active Comic Content
  const handleGoToActiveComic = (comicImage, comicTitle, comicDesc) => {

    //Switching Menus
    setActiveContent(menuContent[menuContent.length - 2])

    //Active Comic element
    setActiveComicContent(

      <div>
        <img src={comicImage} />
        <h1>{comicTitle}</h1>
        <p>{comicDesc}</p>

        <button onClick={() => handleAddToFolder(comicImage, comicTitle, comicDesc, selectorFolderNameRef.current.value)}>Add To Folder</button>
        <select ref={selectorFolderNameRef} name='folderOptions' id='folderOptions'>
          {folderOptions}
        </select>
        <button onClick={() => console.log(selectorFolderNameRef.current.value)}>log</button>
      </div>
    )
  }

  //Delete Folder
  const handleDeleteFolder = (folderToBeDeleted, e) => {
    e.stopPropagation()
    setComicFolders((prev) => ({
      ComicFolders: prev.ComicFolders.filter((folder) => folder.id !== folderToBeDeleted.id)
    }))
  }

  //Delete Comic
  const handleDeleteComic = (folderName, folderIndex, comicToBeDeleted) => {
    //deleting the comic from comicFolders
    setComicFolders((prev) => {
      prev.ComicFolders[folderIndex][folderName] = prev.ComicFolders[folderIndex][folderName].filter((comic) => comic.title !== comicToBeDeleted.title);
      return { ComicFolders: prev.ComicFolders };
    });

    //deleting the comic from the active folder content (so the content updates in real time... yay (2days it took me))
    setActiveFolderContent((prev) => {
      return prev.filter((comic) => comic.props.title !== comicToBeDeleted.title);
    });
  };

  //Folder Mapping
  const modalFolders = comicFolders.ComicFolders.map((folder, folderIndex) => {
    //Folder Name
    const folderName = Object.keys(folder)[0]
    //Comic Mapping (study this later)
    const folderComics = folder[folderName].map((comic, comicIndex) => (
      //Comic Render
      <div key={comicIndex} title={comic.title} >
        <p>{comic.title}</p>
        <button onClick={() => handleGoToActiveComic(comic.image, comic.title, comic.description)}>View Comic</button>
        <button onClick={() => handleDeleteComic(folderName, folderIndex, comic)}>Delete Comic</button>
        <img src={comic.image} style={{ width: '40%' }} />
      </div>
    ))
    //Folder Render
    return (
      <div key={folderIndex} className='modalFolderWrapper' onClick={() => handleGoToActiveFolder(folderComics)}>
        <div className='modalFolder' >
          <div style={{ position: 'absolute', width: '180px', height: 'auto', textWrap: 'wrap', textAlign: 'center' }}>
            <p className='folderName'>{folderName}</p>
          </div>

          {folderIcon}
          <div className='dotsWrapper'>
            {dotsIcon}
          </div>

          <button onClick={(e) => handleDeleteFolder(folder, e)}>Delete Folder</button>
        </div>
      </div>
    );
  });

  //Folder Selector 
  const folderOptions = comicFolders.ComicFolders.map((folder, folderIndex) => {
    const folderOptionName = Object.keys(folder)[0]

    //Render
    return (
      <option key={folderIndex} value={folderOptionName}>{folderOptionName}</option>
    )
  })

  /////////////////////////////////////////
  //                Modal                //
  /////////////////////////////////////////

  //Open Modal
  const handleOpenModal = () => {
    setShowModal(true)
  }

  //Close Modal
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <ModalContext.Provider value={{
      handleCloseModal,
      handleOpenModal,
      showModal,
      comicFolders,
      setComicFolders,
      folderNameRef,
      handleUpdate,
      modalFolders,
      activeContent,
      setActiveContent,
      activeMenu,
      setActiveMenu,
      menuContent,
      menuItemsMap,
      activeFolderContent,
      activeComicContent,
      handleGoToActiveComic,
    }}>
      {children}
    </ModalContext.Provider>
  );
}


export const useModal = () => {
  return useContext(ModalContext);
};
