import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useModal } from './ModalContext'
import './Modal.css'
import "./yearpicker.css";

const Modal = () => {

  const [comicYear, setComicYear] = useState(null);
  const [comics, setComics] = useState([]);
  const [apiURL, setApiURL] = useState("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&limit=48&ts=1&apikey=" + process.env.REACT_APP_1);

  const [info, setInfo] = useState({
    comicName:'',
    comicYear:'',
  });

  const {
    handleCloseModal,
    showModal,
  } = useModal()

  //Search Function
  const handleSearch = () => {

    if (info.comicYear !== '') {
      info.comicYear = 'startYear='+info.comicYear
    }
       
    setApiURL(`https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=${info.comicName}&limit=100&${info.comicYear}&ts=1&apikey=` + process.env.REACT_APP_1)
    console.log('url', apiURL)
    console.log('year', info.comicYear)
    console.log('name', info.comicName)
    
  }

  //getData Function
  const getData = (e) => {
    
    let name = e.target.name
    let value = e.target.value.replace(/ /g, "+")
    
      setInfo(prev => {
        return{...prev,[name]: value}
      })

      console.log(info)

    }

  //remove overflow when modal is open
  if (showModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  //API Call
  useEffect(() => {
    axios.get(apiURL)

      .then(res => {
        setComics(res.data.data.results)
      })
  }, [apiURL]);

  //Comics inside the modal
  const modalComics =
  <>
  {comics.length > 0 ? (
    comics.map(comic =>
    (
      <div key={comic.id} className='modalComic'>
        <img src={comic.thumbnail.path + '.jpg'} className='modalComicCover' alt='Comic Cover' />
        <p>{comic.title}</p>
        <h1 style={{ opacity: "0", fontSize: "1rem" }} >Easter Egg</h1>
      </div>
    ))
  ) : (
    //if the comics are not loaded fast enough show a loading screen
    <p id='loading'>Loading...</p>
  )}
  </>

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button style={{ position: 'absolute', top: '-22px' }} onClick={handleCloseModal}>X</button>

            <header>
              <input name='comicName' id='comicName' type='text' placeholder='Search Comics' onChange={getData} />
              <input name='comicYear' id='comicYear' type='number' min='1930' max='2050' placeholder='Year' onChange={getData} />
              <button onClick={handleSearch}>Search</button>

              <button onClick={() => { console.log(comicYear) }}>test</button>

            </header>

            <div className='modalContent'>

              {modalComics}

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Modal


