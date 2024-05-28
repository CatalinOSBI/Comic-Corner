import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import YourComics from './YourComics';
import BrowseComics from './BrowseComics';
import ActiveFolder from './ActiveFolder';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false);
  const [comicFolders, setComicFolders] = useState(JSON.parse(localStorage.getItem('Comic Folders')));
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeContent, setActiveContent] = useState([0]);
  const [activeFolderContent, setActiveFolderContent] = useState([]);
  const [exportedFolders, setExportedFolders] = useState(1);
  const [test, settest] = useState([]);
  const [reloader, setReloader] = useState(0);
  const folderNameRef = useRef()

  /////////////////////////////////////////
  //              Side Menu              //
  /////////////////////////////////////////

  //default to the first item in menuContent
  useEffect(() => {
    setActiveContent(menuContent[0])
  }, []);

  useEffect(() => {
    console.log(activeFolderContent)
  }, );

  //Selecting Menu Function
  const handleSetActive = (index) => {
    setActiveMenu(index);
    setActiveContent(menuContent[index])
  };

  //the array of contents REMEMBER:(the order of the contents must match with the 'menuItems' ) tldr: the arrays must match each other
  const menuContent = [<YourComics />, <BrowseComics />, <ActiveFolder />]

  //mapping
  const menuItems = ['Your Comics', 'Browse Comics', 'ActiveFolder'];
  const menuItemsMap = menuItems.map((item, index) => (
    <li key={index} onClick={() => handleSetActive(index)}>
      {item}
    </li>
  ))

  /////////////////////////////////////////
  //               Folders               //
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
          id:prev.ComicFolders.length, //id of the folder
        },
      ],
    }));
    setReloader((prev)=> prev+1)
  };

  //this is where the Functions for comics are gonna go (delete, open etc..)
  const handleOpenComic = (comic) => {
    console.log(comic.image)
  }

  //GoTo Active Folder Content
  const handleGoToActiveFolder = (folderContent) => {
    //Go to the last item in the array(this is done so ActiveFolder is always the last item in the array)
    setActiveContent(menuContent[menuContent.length - 1])
    setActiveFolderContent(folderContent)
    console.log(folderContent)
  }

  //Delete Folder
  const handleDeleteFolder = (folderToBeDeleted) => {
    setComicFolders((prev) => ({
      ComicFolders: prev.ComicFolders.filter((folder)=> folder.id !== folderToBeDeleted.id)
    }))
    setReloader((prev)=> prev+1)
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
  
    setReloader((prev) => prev + 1);
  };


    

  //Folder Mapping
  const modalFolders = comicFolders.ComicFolders.map((folder, folderIndex) => {
    //Folder Name
    const folderName = Object.keys(folder)[0]
    //Comic Mapping (study this later)
    const folderComics = folder[folderName].map((comic, comicIndex) => (
      <div key={comicIndex} title={comic.title} >
        <p>{comic.title}</p>
        <button onClick={() => handleOpenComic(comic)}>Open Comic</button>
        <button onClick={()=> handleDeleteComic(folderName, folderIndex, comic)}>Delete Comic</button>
        <img src={comic.image} style={{ width: '40%' }} />
      </div>
    ))
    //Rendering
   console.log('useffect')
    
    console.log('activeFolderContent', activeFolderContent)
    return (
      <div key={folderIndex} className='modalFolder'>
        <p>{folderName}</p>
        <p>{folderIndex}</p>
        <button onClick={() => handleGoToActiveFolder(folderComics)} >Open Folder</button>
        <button onClick={()=> handleDeleteFolder(folder)}>Delete Folder</button>

        {/* {folderComics} */}

      </div>
    );
  });




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
    }}>
      {children}
    </ModalContext.Provider>
  );
}


export const useModal = () => {
  return useContext(ModalContext);
};
