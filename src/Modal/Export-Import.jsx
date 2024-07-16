import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import ExportImportIcon from "./ExportImportIcon";
// import { useModal } from "./ModalContext";

const generateToken = () => {
  const tokenChar = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const ranChar = () => {
    return tokenChar[Math.floor(Math.random() * tokenChar.length)];
  };
  return ranChar() + ranChar() + ranChar() + ranChar() + ranChar() + ranChar();
};

const ExportImport = () => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button
        title="Export/Import Folders"
        className="infoSpacer exportImportButton"
        onClick={() => handleShowModal()}
      >
        <ExportImportIcon />
      </button>
      {showModal && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            opacity: "74%",
            backgroundColor: "black",
            borderRadius:'10px'
          }}
        >
          <button
            title="Export/Import Folders"
            className="infoSpacer exportImportButton"
            onClick={() => handleShowModal()}
          >
            <ExportImportIcon />
          </button>
        </div>
      )}
    </>
  );
};

//Export Component
const Export = () => {
  const handleExport = async (e) => {
    e.preventDefault();

    //Call
    console.log(comicFolders);
    await axios.post(`http://localhost:8080/GetData/${token}`, comicFolders);

    //Display The Token
    const token = generateToken();
    inputRef.current.value = token;
  };
  return (
    <div style={{ width: "200px", height: "200px", border: "solid 1px red" }}>
      <form onClick={(e) => handleExport(e)}>
        Export
        <input type="text" ref={inputRef}></input>
        <button type="submit">Export</button>
        <button onClick={() => console.log(comicFolders)}>log</button>
      </form>
    </div>
  );
};

//Import Component
const Import = () => {
  const handleImport = async (e) => {
    e.preventDefault();

    console.log("form submitted");
  };

  return (
    <div style={{ width: "200px", height: "200px", border: "solid 1px red" }}>
      <form onSubmit={(e) => handleImport(e)}>
        Import
        <input
          style={{ textAlign: "center", fontSize: "2rem" }}
          minLength={6}
          maxLength={6}
          size={3}
          type="text"
          ref={inputRef}
        ></input>
        <button type="submit">Import</button>
      </form>
    </div>
  );
};

export default ExportImport;
