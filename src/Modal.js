import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useModal } from './ModalContext'
import './Modal.css'
import DatePicker from 'react-datepicker';
import "./yearpicker.css";

const Modal = () => {

  const [comics, setComics] = useState([]);

  const {
    handleCloseModal,
    showModal,
  } = useModal()

  //API Call
  useEffect(() => {
    axios.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=miles+morales&startYear=2022&ts=1&apikey=" + process.env.REACT_APP_1)

      .then(res => {
        setComics(res.data.data.results)
      })
  }, []);

  //Comics inside the modal
  const modalComics =
        comics.map(comic =>
        (
          <div key={comic.id} className='modalComic'>
            <img src={comic.thumbnail.path + '.jpg'} className='modalComicCover' alt='Comic Cover' />
            <p>{comic.title}</p>
            <a href={comic.urls[0].url} target='_blank' rel="noreferrer">
              <button>View</button></a>
            <h1 style={{ opacity: "0", fontSize: "1rem" }} >Easter Egg</h1>
          </div>
        ))

  return (
    <>
      {showModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>

            <button style={{ position: 'absolute', top: '-22px' }} onClick={handleCloseModal}>X</button>

            <header>
              <input name='searchBar' id='searchBar' type='text' placeholder='Search Comics' />
              <input name='year' id='year' type='number' min='1900' max='2050' placeholder='Year' />
              <YearPicker />
              <button>Search</button>

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

//Year Picker
const YearPicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      showYearPicker
      dateFormat="yyyy"
    />
  );
};

export default Modal


