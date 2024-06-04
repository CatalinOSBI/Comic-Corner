import React, { useEffect, useState } from 'react'
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

  const [info, setInfo] = useState({
    comicName: '',
    comicYear: '',
  });

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
      comicName: '',
      comicYear: '',
    })
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
        <div key={comic.id} className='modalComic'>
          <img src={comic.thumbnail.path + '.jpg'} className='modalComicCover' alt='Comic Cover' />
          <button onClick={() => handleGoToActiveComic(comic.thumbnail.path + '.jpg', comic.title, comic.description)}>Open Comic</button>
          <p>{comic.title}</p>
          <h1 style={{ opacity: "0", fontSize: "0rem" }} >Easter Egg</h1>
        </div>)
    })

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header style={{overflow:'hidden'}}>
            <img style={{ zIndex:'-1'}} className='dots Top' src={dots} alt='dots' />
            <input className='modalTextInput' name='comicName' id='comicName' type='text' placeholder='Search Comics' onChange={getData} />
            <button onClick={handleSearch}>Search</button>
            <input style={{ width: '55px' }} className='modalTextInput' name='comicYear' id='comicYear' type='number' min='1930' max='2050' placeholder='Year' onChange={getData} />
            <button onClick={() => { console.log('comicYear') }}>test</button>
          </header>

          {modalComics}

        </>
      )}
    </>
  )
}

export default BrowseComics