import React, { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => { 
    setShowModal(true)
   }

   const handleCloseModal = () => { 
    setShowModal(false)
   }

  return (
    <ModalContext.Provider value={{ 
      handleCloseModal,
      handleOpenModal,
      showModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
}


export const useModal = () => {
  return useContext(ModalContext);
};
