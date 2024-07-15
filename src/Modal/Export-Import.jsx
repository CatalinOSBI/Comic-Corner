import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useModal } from "./ModalContext";

const generateToken = () => {
  const tokenChar = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
  ];

  const ranChar = () => {
    return tokenChar[Math.floor(Math.random() * tokenChar.length)];
  };
  return ranChar() + ranChar() + ranChar() + ranChar() + ranChar() + ranChar();
};

const ExportImport = () => {
  const inputRef = useRef();
  const { comicFolders } = useModal();

  const handleExport = async () => {
    //Call
    console.log(comicFolders);
    await axios.post(`http://localhost:8080/GetData/${token}`, comicFolders);

    //Display The Token
    const token = generateToken();
    inputRef.current.value = token;
  };

  return (
    <div style={{ width: "200px", height: "200px", border: "solid 1px red" }}>
      Export
      <input type="text" ref={inputRef}></input>
      <button onClick={() => handleExport()}>test</button>
      <button onClick={() => console.log(comicFolders)}>log</button>
    </div>
  );
};

export default ExportImport;
