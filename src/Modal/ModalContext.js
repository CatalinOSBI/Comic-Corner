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
  const [activeFolderId, setActiveFolderId] = useState();
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [showRenameFolderWindow, setShowRenameFolderWindow] = useState(false);
  const [dynamicOpacity, setDynamicOpacity] = useState(0);

  const folderNameRef = useRef()
  const folderRenameRef = useRef()
  const hideTimeoutRef = useRef();
  const selectorFolderNameRef = useRef()
  const testersRef = useRef()

  const folderIcon = <svg className='folderIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#74a3eb" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
  const dotsIcon = <svg className='dotsIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path fill="#74a3eb" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
  const trashIcon = <svg className='trashIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#393c3f" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
  const penIcon = <svg className='penIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#393c3f" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
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

  //Show DotsMenu
  const handleShowDotsMenu = (e, folderId) => {
    e.stopPropagation()
    clearTimeout(hideTimeoutRef.current);
    setTimeout(() => {
      setDynamicOpacity(1)
    }, 30);
    setActiveFolderId(folderId)
    setShowDotsMenu(!showDotsMenu)
    setShowRenameFolderWindow(false)


    hideTimeoutRef.current = setTimeout(() => {
      setDynamicOpacity(0)

      setTimeout(() => {
        setShowDotsMenu(false)
      }, 99);

    }, 1640);
  }

  //Hide DotsMenu
  const handleHideDotsMenu = (e) => {
    e.stopPropagation()
    setTimeout(() => {
      setDynamicOpacity(0)

    }, 910);
    clearTimeout(hideTimeoutRef.current)

    hideTimeoutRef.current = setTimeout(() => {
      setActiveFolderId(null)
      setShowDotsMenu(false)
    }, 1000);
  }

  //Keep the menu visible while hovering
  const handleKeepMenuVisible = (e, folderId) => {
    e.stopPropagation();
    clearTimeout(hideTimeoutRef.current);

    setActiveFolderId(folderId);
    setShowDotsMenu(true);
  };

  //Update (Add new Folder)
  const handleUpdate = () => {
    let folderName = folderNameRef.current.value;

    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: [
        ...prev.ComicFolders,
        {
          folderContents: [
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
          folderName: folderName //folder name
        },
      ],
    }));
  };

  //Add Comic To Folder
  const handleAddToFolder = (comicImage, comicTitle, comicDesc, folderName) => {

    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: prev.ComicFolders.map(folder =>
        folder.folderName === folderName
          ? {
              ...folder,
              folderContents: [
                ...folder.folderContents,
                {
                  image: comicImage,
                  title: comicTitle,
                  writer: 'writer',
                  description: comicDesc
                }
              ]
            }
          : folder
      )
    }));
  };


  //GoTo Active Folder Content
  const handleGoToActiveFolder = (folderContent) => {
    //Go to the last item in the array(because ActiveFolder is always the last item in the array)
    if (showRenameFolderWindow === false) {
      setActiveContent(menuContent[menuContent.length - 1])
      setActiveFolderContent(folderContent)
      console.log(folderContent)
    }
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

        <button onClick={() => handleAddToFolder(comicImage, comicTitle, comicDesc, selectorFolderNameRef.current.value, selectorFolderNameRef.current.id)}>Add To Folder</button>
        <select ref={selectorFolderNameRef} name='folderOptions' id='folderOptions'>
          {folderOptions}
        </select>
        <button onClick={() => console.log(selectorFolderNameRef.current.id)}>log</button>
      </div>
    )
  }

  //Show Rename Folder Window
  const handleShowRenameWindow = (e) => {
    e.stopPropagation()
    setShowRenameFolderWindow(!showRenameFolderWindow)
    setShowDotsMenu(false)
  };

  //Rename Folder
  const handleRenameFolder = (e, folderId, newName) => {
    e.stopPropagation()
    setShowRenameFolderWindow(!showRenameFolderWindow)

    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: prev.ComicFolders.map(folder =>
        folder.id === folderId ? { ...folder, folderName: newName } : folder
      )
    }))
  };

  //Delete Folder
  const handleDeleteFolder = (folderToBeDeleted, e) => {
    e.stopPropagation()
    setComicFolders((prev) => ({
      ComicFolders: prev.ComicFolders.filter((folder) => folder.id !== folderToBeDeleted.id)
    }))
    setShowDotsMenu(!showDotsMenu)
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

          {showRenameFolderWindow && activeFolderId === folder.id ?
            (
              //Rename Window
              <>
                <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', opacity: '1', transition: 'all .218s' }}>
                  <input style={{ width: '98.2%' }} autoComplete='off' className='modalTextInput' id='folderRename' name='folderRename' placeholder='Folder Name' type='text' ref={folderRenameRef} />
                  {/* <button onClick={handleStorageUpdate}>Storage</button> */}

                  <div className='folderButtonsContainer' >
                    <button className='folderButton' onClick={(e) => handleShowRenameWindow(e)}>Cancel</button>
                    <button className='folderButton' onClick={(e) => handleRenameFolder(e, folder.id, folderRenameRef.current.value)}>Confirm</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ position: 'absolute', width: '180px', height: 'auto', textWrap: 'wrap', textAlign: 'center' }}>
                  <p className='folderName'>{folder.folderName}</p>
                </div>

                {folderIcon}
                <div onClick={(e) => handleShowDotsMenu(e, folder.id)} className='dotsWrapper'>
                  {dotsIcon}

                  {showDotsMenu && activeFolderId === folder.id &&
                    //DotsMenu
                    <div style={{ opacity: dynamicOpacity }} className='dotsMenu' onMouseLeave={(e) => handleHideDotsMenu(e, folder)} onMouseEnter={(e) => handleKeepMenuVisible(e, folder.id)}>
                      <ul className='dotsMenuList' style={{ listStyleType: 'none' }}>
                        <li onClick={(e) => handleShowRenameWindow(e)}> {penIcon} Rename </li>
                        <li onClick={(e) => handleDeleteFolder(folder, e)}> {trashIcon} Delete </li>
                      </ul>
                    </div>
                  }
                </div>
              </>
            )
          }

        </div>
      </div>
    );
  });

  //Folder Selector 
  const folderOptions = comicFolders.ComicFolders.map((folder, folderIndex) => {
    const folderOptionName = folder.folderName 

    //Render
    return (
      <option ref={testersRef} key={folderIndex} value={folderOptionName}>{folderOptionName}</option>
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
