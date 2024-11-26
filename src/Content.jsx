import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useModal } from './Modal/ModalContext';
import Batman1 from './Images/batman1.png';
import Batman2 from './Images/batman2NoBG.png';
import Spiderman1 from './Images/spiderman1.png';
import Spiderman2 from './Images/spiderman2NoBG.png';
import Constantine1 from './Images/john1.png';
import Constantine2 from './Images/john2NoBG.png';
import Joker1 from './Images/joker1.png';
import Joker2 from './Images/joker2NoBG.png';
import Punisher1 from './Images/punisher 1.png';
import Punisher2 from './Images/punisher 2NoBG.png';
import Venom1 from './Images/venom1.png';
import Venom2 from './Images/venom2NoBG.png';
import dots from './Images/279-removebg-preview.png'

export default function Content() {

  return (
    <>
      <div className='content' id='A'>
        <div className='title'>
          <h1>Latest Releases</h1>
        </div>

        <ComicsA />

        <h1 style={{ opacity: '0' }} >Hidden Text</h1>
      </div>

      <div className='content' id='B'>
        <div className='title'>
          <h1>Comic Spotlight</h1>
        </div>

        <ComicsB />

        <h1 style={{ opacity: '0' }} >Hidden Text</h1>
      </div>

      <div className='content' id='C'>
        <div className='title'>
          <h1>News</h1>
        </div>

        <News />

      </div>
    </>
  )
}

// Pulling the comics

// API Response
function ComicsA() {
  const [comics, setComics] = useState([])
  const sliderRef = useRef()

  const {
    handleGoToActiveComic,
  } = useModal()

  // Drag Effect w/ event listeners
  useEffect(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = sliderRef.current;


    const mousedown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }

    const mouseleave = () => {
      isDown = false;
      slider.classList.remove('active');
    }

    const mouseup = () => {
      isDown = false;
      slider.classList.remove('active');
    }

    const mousemove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 0.8; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    }

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseleave', mouseleave);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mousemove', mousemove);

  return () => {

    slider.removeEventListener('mousedown', mousedown);
    slider.removeEventListener('mouseleave', mouseleave);
    slider.removeEventListener('mouseup', mouseup);
    slider.removeEventListener('mousemove', mouseleave);
  };
}, []);  

  //API Call
  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_1

    axios.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&limit=48&ts=1&apikey=" + apiKey)

      .then(res => {
        setComics(res.data.data.results)
      })
  }, []);

  return (
    <div className='middle' ref={sliderRef}>
      {/* Creating a div for each comic in the array */}
      {comics.length > 0 ? (
        comics.map(comic =>
        (
          <div key={comic.id} className='comic'>
            <img draggable='false' src={comic.thumbnail.path + '.jpg'} className='comicCover' alt='Comic Cover' />
            <p style={{userSelect:'none'}}>{comic.title}</p>
            <button onClick={()=> handleGoToActiveComic(comic.thumbnail.path + '.jpg', comic.title, comic.description, comic.pageCount, comic.creators.items, comic.urls[0].url, 0)}>View</button>
            <h1 style={{ opacity: "0", fontSize: "1rem" }} >Easter Egg</h1>
          </div>
        ))
      ) : (
        //if the comics are not loaded fast enough show a loading screen
        <p id='loading'>Loading...</p>
      )}
    </div>

  )
}

function ComicsB() {
  const [comics, setComics] = useState([])
  const sliderRef = useRef()

  const {
    handleGoToActiveComic,
  } = useModal()

  // Drag Effect w/ event listeners
  useEffect(() => {
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = sliderRef.current;


    const mousedown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }

    const mouseleave = () => {
      isDown = false;
      slider.classList.remove('active');
    }

    const mouseup = () => {
      isDown = false;
      slider.classList.remove('active');
    }

    const mousemove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 0.8; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    }

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseleave', mouseleave);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mousemove', mousemove);

    return () => {
      slider.removeEventListener('mousedown', mousedown);
      slider.removeEventListener('mouseleave', mouseleave);
      slider.removeEventListener('mouseup', mouseup);
      slider.removeEventListener('mousemove', mouseleave);
    };
  }, []);

  //link for comics - https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=miles+morales&startYear=2022&limit=99&ts=1&apikey=
  //link for series - https://gateway.marvel.com:443/v1/public/series/39284/comics?noVariants=true&ts=1&apikey=

//API Call  
useEffect(()=>{
  const apiKey = import.meta.env.VITE_APP_1

  axios.get("https://gateway.marvel.com:443/v1/public/series/39436/comics?noVariants=true&ts=1&apikey="+ apiKey)
  
      .then(res => {
        setComics(res.data.data.results)
      })

  }, []);

  return (
    <div className='middle' ref={sliderRef}>
      {/* Creating a div for each comic in the array */}
      {comics.length > 0 ? (
        comics.map(comic =>
        (
          <div key={comic.id} className='comic'>
            <img draggable='false' src={comic.thumbnail.path + '.jpg'} className='comicCover' alt='Comic Cover' />
            <p style={{userSelect:'none'}}>{comic.title}</p>
            <button onClick={()=> handleGoToActiveComic(comic.thumbnail.path + '.jpg', comic.title, comic.description, comic.pageCount, comic.creators.items, comic.urls[0].url, 0)}>View</button>
            <h1 style={{ opacity: "0", fontSize: "1rem" }} >Easter Egg</h1>
          </div>
        ))
      ) : (
        //if the comics are not loaded fast enough show a loading screen
        <p id='loading'>Loading...</p>
      )}
    </div>

  )
}

function News() {
  return (
    <div className='newsContainer'>
      <img src={dots} className='dots Top' alt='dots' />
      <img src={dots} className='dots Bottom' alt='dots' />
      <p className='heroTitle'>New Upcoming Superhero video Game!</p>

      <div className='heroContext'>
        <p>Choose<br /></p>
        <p style={{ marginBottom: '-32px', marginTop: '-40px' }}><span style={{ fontSize: '1.8rem' }}>your</span><br /></p>
        <p style={{ fontSize: '4rem' }}>Menthor</p>
      </div>

      <div className='sideA'>
        <div className='heroContainer' style={{ marginRight: '60vw' }}>
          <img src={Punisher1} className='heroImageA' style={{ transform: 'translateX(5%) translateY(6%)' }} alt='punisher1' />
          <img src={Punisher2} className='heroImageB' alt='punisher2' />
        </div>
        <div className='heroContainer'>
          <img src={Constantine1} className='heroImageA' alt='constantine1' />
          <img src={Constantine2} className='heroImageB' alt='constantine2' />
        </div>
      </div>

      <div className='sideA'>
        <div className='heroContainer' style={{ marginRight: '30vw' }}>
          <img src={Venom1} className='heroImageA' style={{ transform: 'translateX(5%) translateY(5%)' }} alt='venom1' />
          <img src={Venom2} className='heroImageB' alt='venom2' />
        </div>
        <div className='heroContainer'>
          <img src={Spiderman1} className='heroImageA' style={{ transform: 'translateX(-3%) translateY(4%)' }} alt='spiderman1' />
          <img src={Spiderman2} className='heroImageB' alt='spiderman2' />
        </div>
      </div>


      <div className='sideA' style={{ marginBottom: '0px' }}>
        <div className='heroContainer' style={{ marginRight: '60vw' }}>
          <img src={Joker1} className='heroImageA' alt='joker1' />
          <img src={Joker2} className='heroImageBatman' alt='joker2' />
        </div>
        <div className='heroContainer'>
          <img src={Batman1} className='heroImageA' alt='batman1' />
          <img src={Batman2} className='heroImageBatman' alt='batman2' />
        </div>
      </div>
    </div>
  )
}

