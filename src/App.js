import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css"; // Import your CSS file for styling
import About from "./About"; // Import the About component
import LoadingOverlay from "react-loading-overlay-ts";
import { BrowserView, MobileView } from "react-device-detect";



function Home() {
  // Constants to store the selected image, classification status, bird name, bird fact, bird confidence, and loading status
  // Functions to handle image upload, clearing the input, image classification, file drop, and preventing default behavior on file drag over
  const [selectedImage, setSelectedImage] = useState(null);
  const [classified, setClassified] = useState(false);
  const [birdName, setBirdName] = useState(null);
  const [birdFact, setBirdFact] = useState(null);
  const [birdConf, setBirdConf] = useState(null);
  const [birdSciName, setBirdSciName] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = React.useRef(null); // Scroll to bottom of page

  // Function to handle image upload
  const handleImageUpload = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  // Function to handle clearing the input
  const handleClearInput = () => {
    setSelectedImage(null);
    setClassified(false);
    setBirdConf(null);
    setBirdFact(null);
    setBirdName(null);
    scrollTop();
  };
  // Scrolls to bottom of page to show returned bird information
  const scroll = () => {
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const scrollTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };
  // Function to handle image classification
  const handleImageClassify = () => {
    setLoading(true);
    fetch(
      "https://beak-detective-backend-d689fdd19e85.herokuapp.com/classify",
      {
        method: "POST",
        body: JSON.stringify({ image: selectedImage }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClassified(true);
        setBirdName(data["result"]);
        setBirdFact(data["fact"]);
        setBirdConf(data["confidence"]);
        setBirdSciName(data["scientific_name"]);
        setLoading(false);
        scroll();
      })
      .catch((error) => console.error(error));
  };

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload({ target: { files: [file] } });
  };

  // Function to prevent default behavior on file drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    // Loading overlay to display while classifying
    <LoadingOverlay active={loading && !classified} spinner={<img
      src={require("./assets/birdwhite.png")} // Link to the Home page
      style={{ width: 100, height: 100 }}
      alt="Bird Icon"
      className="bird-icon"
    />} className="overlay" >
      <div className="content" id="total_content">
        {selectedImage ? (
          <></>
        ) : (
          <>
            <BrowserView>
              <div className="content">
                <div className="infobox">
                  <h1 style={{marginBottom: "20px"}}> </h1>
                  <h2 className="infobox-title">
                    You've found an interesting bird, but you don't know its
                    species.
                  </h2>
                  <p className="infobox-text">
                    Want to find out what it is? To classify your image, simply
                    drag and drop an image or click on the upload box and select
                    the image of the bird you found. We've built a
                    machine-learning model using 525 species of birds. More than
                    likely, you can find the answer you're looking for! Want to
                    know more? Click on the information icon at the top right of
                    the page.
                  </p>
                </div>
              </div>
            </BrowserView>
            <MobileView>
              <div className="content">
                <div className="infoboxMobile">
                  <h2 className="infobox-title">
                    You've found an interesting bird, but you don't know its
                    species.
                  </h2>
                  <p className="infobox-text">
                    Want to find out what it is? To classify your image, simply
                    drag and drop an image or click on the upload box and select
                    the image of the bird you found. We've built a
                    machine-learning model using 525 species of birds. More than
                    likely, you can find the answer you're looking for! Want to
                    know more? Click on the information icon at the top right of
                    the page.
                  </p>
                </div>
              </div>
            </MobileView>
          </>
        )}
        <BrowserView>
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("upload-input").click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Bird"
                className="uploaded-image"
              />
            ) : (
              // Drag and drop area to upload image
              <p>Drag & Drop or Click here to upload an image</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="upload-input"
            />
          </div>
        </BrowserView>
        <MobileView>
          <div
            className="drop-area"
            onClick={() => document.getElementById("upload-input").click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Bird"
                className="uploaded-image"
              />
            ) : (
              <p className="not-selectable">Click here to upload an image</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="upload-input"
            />
          </div>
        </MobileView>
        {selectedImage && (
          <div className="buttons">
            <button className="classify-button" onClick={handleImageClassify}>
              Classify
            </button>
            <button className="clear-button" onClick={handleClearInput}>
              Clear
            </button>
          </div>
        )}
        {classified && (
          <>
            <BrowserView>
              <div className="content">
                <div className="infobox">
                  <h2 className="infobox-title">Bird Species: {birdName}</h2>
                  <h2 className="infobox-title">Scientific Name: {birdSciName}</h2>
                  <h2 className="infobox-title">Confidence: {birdConf}</h2>
                  <h2 className="infobox-title">Did you know?</h2>
                  <p className="infobox-text">{birdFact}</p>
                </div>
              </div>
            </BrowserView>
            <MobileView>
              <div className="content">
                <div className="infoboxMobile">
                  <h2 className="infobox-title">Bird Species:</h2>
                  <h2 className="infobox-title">{birdName}</h2>
                  <h2 className="infobox-title">Scientific Name:</h2>
                  <h2 className="infobox-title">{birdSciName}</h2>
                  <h2 className="infobox-title">Confidence:</h2>
                  <h2 className="infobox-title">{birdConf}</h2>
                  <h2 className="infobox-title">Did you know?</h2>
                  <p className="infobox-text">{birdFact}</p>
                </div>
              </div>
            </MobileView>
          </>
        )}
        <div ref={ref}></div>
      </div>
    </LoadingOverlay>
  );
}
// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="header-content">
            <Link to="/" className="header-logo">
              <img
                src={require("./assets/birdwhite.png")} // Link to the Home page
                style={{ width: 50, height: 50 }}
                alt="Bird Icon"
                className="bird-icon"
              />
              <h1>Beak Detective</h1>
            </Link>
            <Link to="/about" className="info-button">
              <img
                src={require("./assets/infoiconwhite.png")} // Link to the About page
                style={{ width: 50, height: 50 }}
              ></img>
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
