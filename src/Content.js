import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
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
    <div className='content'>
      <div className='title'>
        <h1>Latest Releases</h1>
      </div>

        <ComicsA/>

      <h1 style={{opacity: '0'}} >Hidden Text</h1> 
    </div>

        <div className='backgroundContainer'>
          <img src={''} className='dotBackground'/>
        </div>

        <div className='content'>
      <div className='title'>
        <h1>Comic Spotlight</h1>
      </div>

        <ComicsB/>

      <h1 style={{opacity: '0'}} >Hidden Text</h1> 
    </div>

    <div className='content'>
      <div className='title'>
        <h1>News</h1>
      </div>

        <News/>

    </div>
    </>
  )
}

// Pulling the comics

// API Response
function ComicsA(){
  const [comics, setComics] = useState ([])

useEffect(()=>{
  axios.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&startYear=2023&ts=1&apikey=882858640be5e1c7df0e46bdf4f238d5&hash=1ee6551d88ceb97e0cddf39e827dfe29")
  
      .then(res => {
          setComics(res.data.data.results)
      })   
// Putting the API Response in an array      
},[]);

return(
    <div className='middle'>
{/* Creating a div for each comic in the array */}
    {comics.length > 0 ? (
      comics.map(comic =>
      (
        <div key={comic.id} className='comic'>
          <img src={comic.thumbnail.path + '.jpg'} className='comicCover'/>
          <p>{comic.title}</p>
          <h1 style={{opacity: "0", fontSize: "1rem"}} >Hidden Text</h1> 
        </div>        
      ))
    ) : (
      //if the comics are not loaded fast enough show a loading screen
        <p id='loading'>Loading...</p> 
    )}
  </div>
  
)}

function ComicsB(){
  const [comics, setComics] = useState ([])

useEffect(()=>{
  axios.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith=red+goblin&startYear=2023&hasDigitalIssue=true&ts=1&apikey=882858640be5e1c7df0e46bdf4f238d5&hash=1ee6551d88ceb97e0cddf39e827dfe29")
  
      .then(res => {
          setComics(res.data.data.results)
      })   
// Putting the API Response in an array      
},[]);

return(
    <div className='middle2'>
{/* Creating a div for each comic in the array */}
    {comics.length > 0 ? (
      comics.map(comic =>
      (
        <div key={comic.id} className='comic'>
          <img src={comic.thumbnail.path + '.jpg'} className='comicCover'/>
          <p>{comic.title}</p>
          <h1 style={{opacity: "0", fontSize: "1rem"}} >Hidden Text</h1> 
        </div>        
      ))
    ) : (
      //if the comics are not loaded fast enough show a loading screen
      <p id='loading'>Loading...</p> 
    )}
  </div>
  
)}

function News(){
  return(
    <div className='newsContainer'>
    <img src={dots} className='dots Top'/>
    <img src={dots} className='dots Bottom'/>

      <div className='sideA'>
        <div className='heroContainer' style={{marginRight: '60vw'}}>
            <img src={Punisher1} className='heroImageA' style={{transform: 'translateX(5%) translateY(6%)'}}/>
            <img src={Punisher2} className='heroImageB'/>
        </div>
        <div className='heroContainer'>
          <img src={Constantine1} className='heroImageA'/>
          <img src={Constantine2} className='heroImageB'/>
        </div>
      </div>

      <div className='sideA'>
          <div className='heroContainer' style={{marginRight: '30vw'}}>
            <img src={Venom1} className='heroImageA' style={{transform: 'translateX(5%) translateY(5%)'}}/>
            <img src={Venom2} className='heroImageB'/>
          </div>
          <div className='heroContainer'>
            <img src={Spiderman1} className='heroImageA' style={{transform: 'translateX(-3%) translateY(4%)'}}/>
            <img src={Spiderman2} className='heroImageB'/>
          </div>
      </div>


      <div className='sideA' style={{marginBottom: '0px'}}>
        <div className='heroContainer' style={{marginRight: '60vw'}}>
          <img src={Joker1} className='heroImageA'/>
          <img src={Joker2} className='heroImageBatman'/>
        </div>
        <div className='heroContainer'>
            <img src={Batman1} className='heroImageA'/>
            <img src={Batman2} className='heroImageBatman'/>
          </div>
      </div>
    </div>  
  )
}

