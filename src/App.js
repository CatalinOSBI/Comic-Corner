import React from 'react'
import Header from './Header';
import Banner from './Banner';
import Content from './Content';
import Footer from './Footer';


function App(){

    
    return(

        
        
        <>
        <Header/>
        <Banner/>
        <Content/>
        <Footer/>
        </>
    );
}

export default App;

// Drag becomes available after 0.5 seconds

setTimeout(() => {
    const slider = document.querySelector('.middle');
    
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}); 
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX)  * 0.8; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});;
    console.log("Delayed for 0.5 seconds.");
  }, 500);




// Drag becomes available after 0.5 seconds

setTimeout(() => {
  const slider = document.querySelector('.middle2');
  
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
isDown = true;
slider.classList.add('active');
startX = e.pageX - slider.offsetLeft;
scrollLeft = slider.scrollLeft;
}); 
slider.addEventListener('mouseleave', () => {
isDown = false;
slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
isDown = false;
slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
if(!isDown) return;
e.preventDefault();
const x = e.pageX - slider.offsetLeft;
const walk = (x - startX)  * 0.8; //scroll-fast
slider.scrollLeft = scrollLeft - walk;
});;
  console.log("Delayed for 0.5 seconds.");
}, 500);