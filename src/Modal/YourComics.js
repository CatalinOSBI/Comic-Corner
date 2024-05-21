import React from 'react'
import './Modal.css'

const YourComics = () => {

  const test = () => {

    let Folder = {


      FieldA: 'A',
      FieldB: 'B',
      FieldC: 'C',



    }

    localStorage.setItem('Comic Folder', JSON.stringify(Folder))

  }

  return (
    <>
      <div className='modalFolder'>
        <button onClick={test}>test</button>
      </div>

      <div className='modalFolder'>
        <button onClick={test}>test</button>
      </div>
    </>
  )
}

export default YourComics