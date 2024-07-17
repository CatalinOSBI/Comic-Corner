import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import ExportImportIcon from "./ExportImportIcon";
import { useModal } from "./ModalContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const [activeContent, setActiveContent] = useState();
  const { comicFolders, setComicFolders, arrowIcon } = useModal();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  //Export Component
  const Export = () => {
    const inputRef = useRef();
    const headRef = useRef();

    const handleExport = async (e) => {
      e.preventDefault();

      //Generate Token
      const token = generateToken();

      //Change Header
      headRef.current.textContent = "Loading...";

      //Call
      await axios.post(
        `http://localhost:8080/api/SendData/${token}`,
        comicFolders
      );

      //Change Header
      headRef.current.textContent = "Your Token:";
      console.log(comicFolders);

      //Display The Token
      inputRef.current.value = token;
    };

    return (
      <>
        <div
          className="activeComicFloatingText"
          style={{ top: "0", marginLeft: "8px" }}
        >
          <p
            onClick={() => handleSetActive(<Home />)}
            style={{ fontSize: "1rem" }}
            className="title"
          >
            {arrowIcon} Go Back
          </p>
        </div>
        <form onSubmit={(e) => handleExport(e)}>
          <h1
            ref={headRef}
            className="title"
            style={{
              textTransform: "none",
              fontSize: "2rem",
              textAlign: "center",
              fontFamily: "Roboto",
            }}
          >
            Export Data
          </h1>
          <input
            style={{
              textAlign: "center",
              fontSize: "2rem",
              border: "none",
              backgroundColor: " rgb(234, 237, 255)",
            }}
            minLength={6}
            maxLength={6}
            size={5}
            type="text"
            ref={inputRef}
          ></input>
          <button
            type="submit"
            style={{ width: "100%" }}
            className="folderButton"
            title="Click to Export and receive your Token"
          >
            Export Data
          </button>
        </form>
      </>
    );
  };

  //Import Component
  const Import = () => {
    const inputRef = useRef();
    const headRef = useRef();

    const handleImport = (e) => {
      e.preventDefault();
      const token = inputRef.current.value;

      //Enable Loading
      setIsLoading(true);
      axios
        .get(`http://localhost:8080/api/GetData/${token}`)
        .then((res) => {
          // Merging objectA and objectB, replacing folders with matching folderName
          //GUUUUUUUUUTS AND GLOOOOOOOOOOOOOOORY!!!
          setComicFolders((prev) => {
            const existingFolders = prev.ComicFolders;
            const newFolders = res.data.ComicFolders;

            // Merging logic
            const mergedFolders = existingFolders.map((folder) => {
              const matchingFolder = newFolders.find(
                (newFolder) => newFolder.folderName === folder.folderName
              );
              
              //Check for comic duplicates
              if (matchingFolder) {
                const combinedContents = [
                  ...folder.folderContents,
                  ...matchingFolder.folderContents.filter(
                    (newContent) =>
                      !folder.folderContents.some(
                        (existingContent) =>
                          existingContent.title === newContent.title
                      )
                  ),
                ];

                return {
                  ...folder,
                  folderContents: combinedContents,
                };
              }

              return folder;
            });

            // Add any new folders from the imported data that do not exist in the current state
            newFolders.forEach((newFolder) => {
              if (
                !existingFolders.some(
                  (folder) => folder.folderName === newFolder.folderName
                )
              ) {
                mergedFolders.push(newFolder);
              }
            });

            return {
              ...prev,
              ComicFolders: mergedFolders,
            };
          });
          //Disable Loading
          setIsLoading(false);
          headRef.current.textContent = "Data Imported";
        })
        .catch((error) => {
          console.log(error);
          headRef.current.textContent = error.response.data;
        });

      console.log("form submitted");
    };

    //Change Header text based on loading state
    useEffect(() => {
      let headText = headRef.current.textContent;
      isLoading ? (headText = "Loading...") : (headText = "Your Token");
    }, [isLoading]);

    return (
      <>
        <div
          className="activeComicFloatingText"
          style={{ top: "0", marginLeft: "8px" }}
        >
          <p
            onClick={() => handleSetActive(<Home />)}
            style={{ fontSize: "1rem" }}
            className="title"
          >
            {arrowIcon} Go Back
          </p>
        </div>
        <form onSubmit={(e) => handleImport(e)}>
          <h1
            ref={headRef}
            className="title"
            style={{
              textTransform: "none",
              fontSize: "2rem",
              textAlign: "center",
              fontFamily: "Roboto",
            }}
          >
            Your Token:
          </h1>
          <input
            style={{ textAlign: "center", fontSize: "2rem" }}
            minLength={6}
            maxLength={6}
            size={5}
            type="text"
            ref={inputRef}
            required={true}
          ></input>
          <button
            type="submit"
            style={{ width: "100%" }}
            className="folderButton"
          >
            Import Data
          </button>
        </form>
      </>
    );
  };

  //Home Component
  const Home = () => {
    return (
      <>
        <h1
          className="title"
          style={{
            textTransform: "none",
            fontSize: "2rem",
            textAlign: "center",
            fontFamily: "Roboto",
          }}
        >
          Are you going to:
        </h1>

        <div className="exportImportButtonContainer">
          {menutItemsMap}
          <div className="exportImportFloaterContainer">
            <p>Or</p>
          </div>
        </div>
      </>
    );
  };

  //default to the 1st menu/content
  useEffect(() => {
    handleSetActive(<Home />);
  }, []);

  //Selecting Menu Function
  const handleSetActive = (content) => {
    setActiveContent(content);
  };

  //mapping
  const menuItems = [
    {
      name: "Export Data",
      visible: true,
      content: <Export />,
    },
    {
      name: "Import Data",
      visible: true,
      content: <Import />,
    },
    {
      name: "Home",
      visible: false,
      content: <Home />,
    },
  ];

  const menutItemsMap = menuItems.map((item, index) => {
    return (
      item.visible === true && (
        <button
          className="folderButton"
          key={index}
          onClick={() => setActiveContent(item.content)}
        >
          {item.name}
        </button>
      )
    );
  });

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
          className="modalOverlay"
          style={{ position: "absolute", width: "100%", top: "0", left: "0" }}
        >
          <div
            className="modalContainer"
            style={{ width: "248px", minWidth: "0px" }}
          >
            <div
              className="modalContent"
              style={{
                height: "228px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {activeContent}
              <button
                className="closeModalButton"
                onClick={() => setShowModal(!showModal)}
              >
                <p>X</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportImport;
