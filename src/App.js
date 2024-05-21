import React from 'react'
import Header from './Header';
import Banner from './Banner';
import Content from './Content';
import Footer from './Footer';
import Modal from './Modal/Modal';

function App() {


  return (
    <>
      <Modal />
      <Header />
      <Banner />
      <Content />
      <Footer />
    </>
  );
}

export default App;