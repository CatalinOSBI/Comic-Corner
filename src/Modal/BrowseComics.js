import React, { useEffect, useState, useRef } from 'react'
import { useModal } from './ModalContext';
import axios from 'axios';
import './Modal.css'
import dots from '../Images/279-removebg-preview.png'

const BrowseComics = () => {

  const {
    handleGoToActiveComic,
  } = useModal()

  const [comics, setComics] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [apiURL, setApiURL] = useState("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&limit=48&ts=1&apikey=" + process.env.REACT_APP_1);

  const searchIcon = <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>

  const [info, setInfo] = useState({
    comicName: '',
    comicYear: '',
  });
  const textInputRef = useRef()
  const numberInputRef = useRef()

  //Search Function
  const handleSearch = () => {

    if (info.comicYear !== '') {
      info.comicYear = 'startYear=' + info.comicYear
    }

    setApiURL(`https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=${info.comicName}&limit=100&${info.comicYear}&ts=1&apikey=` + process.env.REACT_APP_1)
    console.log('url', apiURL)
    console.log('year', info.comicYear)
    console.log('name', info.comicName)

    //Clear Search
    setInfo({
      comicName: textInputRef.current.value,
      comicYear: numberInputRef.current.value,
    })
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

    axios.get(apiURL)

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
      return (
        <div onClick={() => handleGoToActiveComic(comic.thumbnail.path + '.jpg', comic.title, comic.description, comic.pageCount)} key={comic.id} className='modalComic'>
          <img src={comic.thumbnail.path + '.jpg'} className='modalComicCover' alt='Comic Cover' />

          <div className='infoWrapper'>
            <p className='modalComicTitle'>{comic.title}</p>
            <div className='infoSpacer'>s</div>
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