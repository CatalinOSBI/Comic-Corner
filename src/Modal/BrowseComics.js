import React, { useEffect, useState, useRef } from 'react'
import { useModal } from './ModalContext';
import axios from 'axios';
import './Modal.css'
import dots from '../Images/279-removebg-preview.png'

const BrowseComics = () => {

  const {
    handleGoToActiveComic,
    comicFolders,
    handleAddToFolder,
    penIcon,
  } = useModal()

  const [comics, setComics] = useState([]);
  const [dynamicOpacity, setDynamicOpacity] = useState(0);
  const [showComicMenu, setShowComicMenu] = useState(false);
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [activeComicTitle, setActiveComicTitle] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [apiURL, setApiURL] = useState((() => {
    const localStorageUrl = localStorage.getItem('Last Search');
   return localStorageUrl ? localStorageUrl : 'https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&limit=99&ts=1&apikey=';
 }));
  const [info, setInfo] = useState({
    comicName: '',
    comicYear: '',
  });

  const searchIcon = <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
  const dotsIconComic = <svg className='dotsIconComic' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>

  const textInputRef = useRef()
  const numberInputRef = useRef()
  const hideTimeoutRef = useRef();

  useEffect(() => {
    localStorage.setItem('Last Search', apiURL)

  }, [apiURL]);

  //Search Function
  const handleSearch = () => {

    if (info.comicYear !== '') {
      info.comicYear = 'startYear=' + info.comicYear
    }

    setApiURL(`https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=${info.comicName}&limit=100&${info.comicYear}&ts=1&apikey=`)
    console.log('url', apiURL)
    console.log('year', info.comicYear)
    console.log('name', info.comicName)

    //Clear Search
    setInfo({
      comicName: textInputRef.current.value,
      comicYear: numberInputRef.current.value,
    })
  }

  //Show DotsMenu
  const handleShowComicMenu = (e, comicTitle) => {
    e.stopPropagation()
    setShowSecondaryMenu(false)

    clearTimeout(hideTimeoutRef.current);
    setTimeout(() => {
      setDynamicOpacity(1)
    }, 30);
    setActiveComicTitle(comicTitle)
    setShowComicMenu(!showComicMenu)

    hideTimeoutRef.current = setTimeout(() => {
      setDynamicOpacity(0)

      setTimeout(() => {
        setShowComicMenu(false)
      }, 99);

    }, 1640);
  }

  //Hide DotsMenu
  const handleHideDotsMenu = (e) => {
    e.stopPropagation()
    clearTimeout(hideTimeoutRef.current)
    setTimeout(() => {
      setDynamicOpacity(1)

    }, 910);

    hideTimeoutRef.current = setTimeout(() => {
      setShowComicMenu(false)
    }, 1000);
  }

  //Keep the menu visible while hovering
  const handleKeepMenuVisible = (e, comicTitle) => {
    e.stopPropagation();
    clearTimeout(hideTimeoutRef.current)

    setActiveComicTitle(comicTitle)
    setShowComicMenu(true)
    setDynamicOpacity(1)
  }

  //Event Listener for Enter
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  //getData Function
  const getData = (e) => {

    let name = e.target.name
    let value = e.target.value.replace(/ /g, "+")

    setInfo(prev => {
      return { ...prev, [name]: value }
    })
    console.log(info)
  }

  //API Call
  useEffect(() => {
    setisLoading(true) //show loading

    axios.get(apiURL + process.env.REACT_APP_1)

      .then(res => {
        setComics(res.data.data.results)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setisLoading(false)
      })
  }, [apiURL]);

  //Comics inside the modal
  const modalComics =
    comics.map((comic) => {
    //----------------------------------------------------------------------------------  
      //Folder Selector 
      const folderOptions = comicFolders.ComicFolders.map((folder, folderIndex) => {
        const folderOptionName = folder.folderName

        //Render
        return (
          <li onClick={(e) => handleAddToFolder(e, comic.thumbnail.path + '.jpg', comic.title, comic.description, comic.pageCount, e.target.innerText, setShowComicMenu)} key={folderIndex} id={folderOptionName}>{folderOptionName}</li>
        )
      })
    //----------------------------------------------------------------------------------
      return (
        <div onClick={() => handleGoToActiveComic(comic.thumbnail.path + '.jpg', comic.title, comic.description, comic.pageCount)} key={comic.id} className='modalComic'>
          <img src={comic.thumbnail.path + '.jpg'} className='modalComicCover' alt='Comic Cover' />

          <div className='infoWrapper'>
            <p className='modalComicTitle'>{comic.title}</p>
            <div onClick={(e) => handleShowComicMenu(e, comic.title)} className='infoSpacer'>{dotsIconComic}

              {showComicMenu && activeComicTitle === comic.title &&
                //DotsMenu
                <>
                  <div style={{ opacity: dynamicOpacity, bottom: '0', right: '0', transform: 'translateY(-21px)' }} className='dotsMenu' onMouseEnter={(e) => handleKeepMenuVisible(e, comic.title)} onMouseLeave={(e) => handleHideDotsMenu(e, comic)}>

                    <ul className='dotsMenuList' style={{ listStyleType: 'none' }} >
                      {showSecondaryMenu &&
                        [folderOptions]
                      }
                      <li onMouseEnter={() => setShowSecondaryMenu(true)}> {penIcon} Add To </li>
                    </ul>

                  </div>
                </>
              }

            </div>
          </div>

          <h1 style={{ opacity: "0", fontSize: "0rem" }} >Easter Egg</h1>
        </div>)
    })

  return (
    <>
      <header style={{ overflow: 'hidden' }}>

        <img style={{ zIndex: '-1' }} className='dots Top' src={dots} alt='dots' />

        <div className='modalInputWrapper'>
          <input onKeyDown={(e) => handleEnterKeyPress(e)} style={{ width: '280px' }} className='modalTextInput' name='comicName' id='comicName' type='text' placeholder='Search Comics' ref={textInputRef} onChange={getData} />
          <button className='modalSearchButton' onClick={handleSearch}>{searchIcon}</button>
        </div>

        <input style={{ width: '55px' }} className='modalTextInput' name='comicYear' id='comicYear' type='number' min='1930' max='2050' placeholder='Year' ref={numberInputRef} onChange={getData} />
      </header>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img style={{ zIndex: '-1', opacity: '4%' }} className='dots Top' src={dots} alt='dots' />
          {modalComics}
          <img style={{ zIndex: '-1', opacity: '4%' }} className='dots Bottom' src={dots} alt='dots' />
        </>
      )}
    </>
  )
}

export default BrowseComics