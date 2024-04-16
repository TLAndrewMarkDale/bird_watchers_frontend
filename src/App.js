import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling
import About from './About'; // Import the About component

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [classified, setClassified] = useState(false);
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
  };

  // Function to handle image classification
  const handleImageClassify = () => {
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ image: selectedImage }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClassified(true);
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
    <div className="content">
      {selectedImage ? (<></>) : (
      <div className="infobox">
        <h2 className="infobox-title">You've found an interesting bird, but you don't know its species.</h2>
        <p className="infobox-text">Want to find out what it is? To classify your image, simply drag and drop an image or click on the upload box and select the image of the bird you found. We've built a machine-learning model using 525 species of birds. More than likely, you can find the answer you're looking for! Want to know more? Click on the information icon at the top right of the page.</p>
      </div>
      )}
      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('upload-input').click()}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded Bird" className="uploaded-image" />
        ) : (
          <p>Drag & Drop or Click Here to Upload Image</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} id="upload-input" />
      </div>
      {selectedImage && (
        <div className="buttons">
          <button className="classify-button" onClick={handleImageClassify}>Classify</button>
          <button className="clear-button" onClick={handleClearInput}>Clear</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="header-content">
            <Link to="/" className="header-logo">
              <img src={require('./assets/birdwhite.png')} style={{width:50, height: 50}} alt="Bird Icon" className="bird-icon" />
              <h1>Beak Detective</h1>
            </Link>
            <Link to="/about" className="info-button"><img src={require('./assets/infoiconwhite.png')} style={{width:50, height:50}}></img></Link>
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