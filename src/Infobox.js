import React from 'react';

function InfoBox({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="infobox">
      <div className="infobox">
        <h2>Title: Found an interesting bird?</h2>
        <p>Want to find out what it is? Simply drag and drop an image or click on the upload box and select the image of the bird you found. We've built a machine learning model on 525 species of birds. More than likely, you can find the answer you're looking for! Want to know more? Click on the information icon in the top right of the page.</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default InfoBox;