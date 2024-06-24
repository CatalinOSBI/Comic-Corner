import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import YourComics from './YourComics';
import BrowseComics from './BrowseComics';
import ActiveFolder from './ActiveFolder';
import ActiveComic from './ActiveComic';
import IronMan1 from '../Images/IronMan1TEST.png';
import IronMan2 from '../Images/IronMan1TEST2.png'
import Hulk1 from '../Images/Hulk1TEST.png'
import Hulk2 from '../Images/Hulk1TEST2.png'
import dots from '../Images/279-removebg-preview.png'

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false);
  const [idCounter, setIdCounter] = useState((() => {
    const localStorageIdCounter = localStorage.getItem('Folder Id Counter');
    return localStorageIdCounter ? parseInt(localStorageIdCounter, 10) : -1;;
  }));
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeContent, setActiveContent] = useState([0]);
  const [activeFolderContent, setActiveFolderContent] = useState([]);
  const [activeComicContent, setActiveComicContent] = useState([]);
  const [activeFolderId, setActiveFolderId] = useState();
  const [showFolderMenu, setShowFolderMenu] = useState(false);
  const [showRenameFolderWindow, setShowRenameFolderWindow] = useState(false);
  const [dynamicOpacity, setDynamicOpacity] = useState(0);
  const [comicFolders, setComicFolders] = useState((() => {
    const localStorageFolders = localStorage.getItem('Comic Folders');
    return localStorageFolders ? JSON.parse(localStorageFolders) : { ComicFolders: [] };
  }));

  const folderNameRef = useRef()
  const folderRenameRef = useRef()
  const hideTimeoutRef = useRef();

  const folderIcon = <svg className='folderIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#74a3eb" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
  const dotsIconFolder = <svg className='dotsIconFolder' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path fill="#74a3eb" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
  const trashIcon = <svg className='trashIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
  const penIcon = <svg className='penIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#393c3f" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
  const arrowIcon = <svg style={{fill:'black'}} className='arrowIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
  const arrowIcon2 = <svg style={{ transform: 'rotate(180deg)', fill:'black' }} className='arrowIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
  /////////////////////////////////////////
  //              Side Menu              //
  /////////////////////////////////////////

  useEffect(() => {
    localStorage.setItem('Folder Id Counter', idCounter)

  }, [idCounter]);

  //default to the 1st menu/content
  useEffect(() => {
    handleSetActive(0)
  }, []);

  //Selecting Menu Function
  const handleSetActive = (index) => {
    setActiveMenu(index);
    setActiveContent(menuContent[index])
  };

  //the array of contents REMEMBER:(the order of the contents must match with the 'menuItems' ) tldr: the arrays must match each other
  const menuContent = [<YourComics key="1" />, <BrowseComics key="2"/>, <ActiveComic key="3"/>, <ActiveFolder key="4"/>]

  //mapping
  const menuItems = [{
    name: 'Your Comics',
    image: IronMan1,
    imageNoBg: IronMan2,
    visible: 1,
  },
  {
    name: 'Browse Comics',
    image: Hulk1,
    imageNoBg: Hulk2,
    visible: 1,
  },
  {
    name: 'ActiveComic',
    image: '',
    imageNoBg: '',
    visible: 'none',
  },
  {
    name: 'ActiveFolder',
    image: '',
    imageNoBg: '',
    visible: 'none',
  }]

  const liDynamicStyling = (itemIndex, visibility) => ({
    backgroundColor: activeMenu === itemIndex || activeIndex === itemIndex ? '#3371e6' : '#2654aa',
    scale: activeMenu === itemIndex || activeIndex === itemIndex ? '1.1' : '1',
    display: visibility
  })

  const liImageDynamicStyling = (itemIndex) => ({
    width: activeMenu === itemIndex ? '60%' : '50%',
  })

  const menuItemsMap = menuItems.map((item, index) => (
    <li key={index} style={liDynamicStyling(index, item.visible)} onClick={() => handleSetActive(index)} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
      <p>{item.name}</p>
      <img style={{ opacity: '10%', width: '50%' }} className='dots Bottom' src={dots} alt='dots' />
  
      <div className='modalLiImageWrapper'>
        <img className='modalLiImage' src={activeMenu === index || activeIndex === index ? item.imageNoBg : item.image} style={liImageDynamicStyling(index)} alt={item.image} />
      </div>
    </li>
  ));

  /////////////////////////////////////////
  //           Folders/Comics            //
  /////////////////////////////////////////

  //Update LocalStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('Comic Folders', JSON.stringify(comicFolders))

  }, [comicFolders]);

  //Show DotsMenu
  const handleshowFolderMenu = (e, folderId) => {
    e.stopPropagation()


    clearTimeout(hideTimeoutRef.current);
    setTimeout(() => {
      setDynamicOpacity(1)
    }, 30);
    setActiveFolderId(folderId)
    setShowFolderMenu(!showFolderMenu) //show
    setShowRenameFolderWindow(false)

    hideTimeoutRef.current = setTimeout(() => {
      setDynamicOpacity(0)

      setTimeout(() => {
        setShowFolderMenu(false)
      }, 99);

    }, 1640);
  }

  //Hide DotsMenu
  const handleHideDotsMenu = (e) => {
    e.stopPropagation()
    
    clearTimeout(hideTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => {
      
      setActiveFolderId(null)
      setShowFolderMenu(false)
    }, 1000);
  }

  //Keep the menu visible while hovering
  const handleKeepMenuVisible = (e, folderId) => {
    e.stopPropagation();
    clearTimeout(hideTimeoutRef.current);

    setActiveFolderId(folderId);
    setShowFolderMenu(true);
  };

  //Update (Add new Folder)
  const handleUpdate = (menu) => {
    let folderName = folderNameRef.current.value;

    //Increase Counter
    setIdCounter((prev) => prev + 1)

    setComicFolders((prev) => ({
      ...prev,
      ComicFolders: [
        ...prev.ComicFolders,
        {
          folderContents: [],
          id: idCounter, //id of the folder
          folderName: folderName //folder name
        },
      ],
    }));
    menu(false)
  };

  //Add Comic To Folder
  const handleAddToFolder = (e, comicImage, comicTitle, comicDesc, pageCount, folderName, creators, marvelLink, menu) => {
    e.stopPropagation()

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
                creators: creators,
                description: comicDesc,
                pageCount: pageCount,
                marvelLink: marvelLink
              }
            ]
          }
          : folder
      )
    }));

    menu(false)

  };


  //GoTo Active Folder Content
  const handleGoToActiveFolder = (folderContent) => {

    //Go to activeFolder menu/content if renameMenu is not open
    if (showRenameFolderWindow === false) {
      setActiveContent(menuContent[menuContent.length - 1])
      setActiveFolderContent(folderContent)
      console.log(folderContent)
    }
  }

  //GoTo Active Comic Content
  const handleGoToActiveComic = (comicImage, comicTitle, comicDesc, pageCount, comicCreators, marvelLink, menuContentIndex) => {
    //Open Modal
    setShowModal(true)

    //Creators Map
    const creatorsMap = comicCreators.map((creator, creatorIndex) => {
      return (<p key={creatorIndex} style={{ textTransform: 'capitalize' }}>
        <span className='modalComicTitle'>
       {creator.name}
        </span> - {creator.role}
      </p>)
    })

    //Switching Menus
    setActiveContent(menuContent[menuContent.length - 2])

    //Active Comic element
    setActiveComicContent(
      <>
        <div style={{ position: 'relative', marginBottom: '-24px', width: '100%', display:'flex', justifyContent:'space-between' }} className='activeComicFloatingText'> <p onClick={() => setActiveContent(menuContent[menuContentIndex])} style={{ fontSize: '1rem' }} className='title'>{arrowIcon} Go Back</p> <a rel="noreferrer" href={marvelLink} target="_blank" style={{color:'inherit'}} className='title'>Marvel site {arrowIcon2}</a></div>

        <div className='activeComicContent'>

          <div className='modalActiveComic'>
            <img className='modalComicCover' src={comicImage} alt='Comic Cover' />
          </div>

          {/* Spacer */}
          <div className='spacer'></div>


          <div className='activeComicInfo'>
            <div className='modalActiveComicBg'>
              <img className='modalComicCover' src={comicImage} alt='Comic Background' />
            </div>

            <h1 className='title'>{comicTitle}</h1>

            <div>
              <p style={{ fontSize: '1rem', border: 'none' }} className='title'>Creators:</p>
              <div style={{ fontWeight: '400' }} className='modalComicTitle'>{creatorsMap} </div>
            </div>

            <div>
              <p style={{ fontSize: '1rem', border: 'none' }} className='title'>Pages:</p>
              <p style={{ fontWeight: '400' }} className='modalComicTitle'>{pageCount}</p>
            </div>

            <p className='modalComicTitle'>{comicDesc}</p>
          </div>

        </div>
      </>
    )
  }

  //Show Rename Folder Window
  const handleShowRenameWindow = (e, folderName) => {
    e.stopPropagation()
    setShowRenameFolderWindow(!showRenameFolderWindow)
    setShowFolderMenu(false)

    setTimeout(() => {
      folderRenameRef.current.value = folderName;
    }, 1);

  }

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
    setShowFolderMenu(!showFolderMenu)
  }

  //Delete Comic
  const handleDeleteComic = (e, folderName, folderIndex, comicToBeDeleted) => {
    e.stopPropagation()
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
    //Accesing the first key of the data
    const folderName = Object.keys(folder)[0]
    //Comic Mapping (study this later)
    const folderComics = folder[folderName].map((comic, comicIndex) => (
      //Comic Render
      <div onClick={() => handleGoToActiveComic(comic.image, comic.title, comic.description, comic.pageCount, comic.creators, comic.marvelLink, 3)} key={comicIndex} title={comic.title} className='modalComic' >
        <img className='modalComicCover' src={comic.image} alt='Comic Cover' />

        <div className='infoWrapper'>
          <p className='modalComicTitle'>{comic.title}</p>
          <button title='Delete Comic' style={{ cursor: 'pointer' }} onClick={(e) => handleDeleteComic(e, folderName, folderIndex, comic)} className='infoSpacer'>{trashIcon}</button>
        </div>

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

                  <div className='folderButtonsContainer' >
                    <button className='folderButton' onClick={() => setShowRenameFolderWindow(false)}>Cancel</button>
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
                <div onClick={(e) => handleshowFolderMenu(e, folder.id)} className='dotsWrapper'>
                  {dotsIconFolder}

                  {showFolderMenu && activeFolderId === folder.id &&
                    //DotsMenu
                    <div style={{ opacity: dynamicOpacity, right: '0', top: '0', transform: 'translateY(32px)' }} className='dotsMenu' onMouseLeave={(e) => handleHideDotsMenu(e, folder)} onMouseEnter={(e) => handleKeepMenuVisible(e, folder.id)}>
                      <ul className='dotsMenuList' style={{ listStyleType: 'none' }}>
                        <li style={{ gap: '8px' }} onClick={(e) => handleShowRenameWindow(e, folder.folderName)}> {penIcon} Rename </li>
                        <li style={{ gap: '8px' }} onClick={(e) => handleDeleteFolder(folder, e)}> {trashIcon} Delete </li>
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
      handleAddToFolder,
      arrowIcon,
    }}>
      {children}
    </ModalContext.Provider>
  );
}


export const useModal = () => {
  return useContext(ModalContext);
};
