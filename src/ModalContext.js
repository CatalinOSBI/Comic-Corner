import React, { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {


  return (
    <ModalContext.Provider value={{ 
      // imports go here,
      // imports go here,
      }}>
      {children}
    </ModalContext.Provider>
  );
}


export const useModal = () => {
  return useContext(ModalContext);
};
