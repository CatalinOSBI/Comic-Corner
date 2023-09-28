import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';


export default function ContentOne() {

  const [comic1, setComic1] = useState ([])
  const [comic2, setComic2] = useState ([])
  const [comic3, setComic3] = useState ([])
  const [comic4, setComic4] = useState ([])
  const [comicAll, setComicAll] = useState ([])

  // fetch('https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&startYear=2023&hasDigitalIssue=true&ts=1&apikey=882858640be5e1c7df0e46bdf4f238d5&hash=1ee6551d88ceb97e0cddf39e827dfe29')
  // .then(res => res.json())
  // .then((data) => {
  //     const IMAGELINK = console.log(data.data.results[0].thumbnail.path);
  //     console.log(data.data.results[0].thumbnail.extension);
  // })
useEffect(()=>{
  axios.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&dateDescriptor=thisWeek&startYear=2023&hasDigitalIssue=true&ts=1&apikey=882858640be5e1c7df0e46bdf4f238d5&hash=1ee6551d88ceb97e0cddf39e827dfe29")
      .then((res) => {
          setComic1(res.data.data.results[0].thumbnail.path)
          setComic2(res.data.data.results[1].thumbnail.path)
          setComic3(res.data.data.results[2].thumbnail.path)
          setComic4(res.data.data.results[3].thumbnail.path)
          setComicAll(res.data)
      })
      console.log(comicAll)

},[]) 


  return (
    
    <div className='contentOne'>
      <div className='title'>
        <h1>Latest Releases</h1>
      </div>
      <div className='middle'>
        <Comic imgLink={comic1 + '.jpg'} Title='Comic Title'/>
        <Comic imgLink={comic2 + '.jpg'} Title='Comic Title'/>
        <Comic imgLink={comic3 + '.jpg'} Title='Comic Title'/>
        <Comic imgLink={comic4 + '.jpg'} Title='Comic Title'/>
      </div>
      <h1 style={{opacity: '0'}} >Hidden Text</h1> 
    </div>
  )
}

function Comic(props){
  return(
    <div className='comic'>
      <img src={props.imgLink} className='comicCover'/>
      <p>{props.Title}</p>
    </div>
  )
}
