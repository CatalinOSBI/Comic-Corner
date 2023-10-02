import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';


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
          console.log(comics)
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
          console.log(comics)
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
      <h1>News Title</h1>
    </div>
  )
}