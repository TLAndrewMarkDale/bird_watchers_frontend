import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserView, MobileView } from "react-device-detect";
import "./App.css";

// Function to display the About page
function About() {
  const images = [
    require("./assets/images_carousel/bittern_1.jpg"),
    require("./assets/images_carousel/bittern_2.jpg"),
    require("./assets/images_carousel/humming_1.jpg"),
    require("./assets/images_carousel/humming_2.jpg"),
    require("./assets/images_carousel/red_start1.jpg"),
    require("./assets/images_carousel/red_start2.jpg"),
    require("./assets/images_carousel/robin1.jpg"),
    require("./assets/images_carousel/robin2.jpg"),
    require("./assets/images_carousel/tailor_1.jpg"),
    require("./assets/images_carousel/tailor_2.jpg"),
    require("./assets/images_carousel/warbler_1.jpg"),
    require("./assets/images_carousel/warbler_2.jpg"),
  ];

  return (
    <>
      <BrowserView>
        <div className="content">
          <div className="infobox">
            <h2 className="infobox-title">About Page</h2>
            <p className="infobox-text">
              This website was created to help amateur birdwatchers identify the
              species of birds they find. The machine-learning model used in
              this website was trained on 525 species of birds. The model is
              capable of classifying images of birds with high accuracy. To
              classify an image, simply drag and drop an image or click on the
              upload box and select the image of the bird you found. More than
              likely, you can find the answer you're looking for! There are over
              9700 species of birds, and they can be found in various habitats
              around the world. Birds are known for their colorful plumage,
              melodious songs, and diverse behaviors. Birdwatching is a popular
              hobby that allows people to observe and appreciate the beauty of
              birds in their natural habitats. That being said, it can be
              challenging to identify the species of birds, especially for
              beginners. This website aims to make bird identification easier
              and more accessible to everyone. We are not able to train our
              model on every bird species; however, this should serve as a good
              starting point for bird identification. If you are unable to find
              the species of the bird you are looking for, we recommend
              consulting a field guide or a bird expert for further assistance.
              Happy birdwatching!
              <br />
              <br />
              This website was created by Andrew Mark Dale and Andre Dallaire
              for the final project of AIDI-2000 Applied Machine Learning at
              Durham College.
            </p>

            <div className="image-grid">
              {images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="content">
          <div className="infoboxMobile">
            <h2 className="infobox-title">About</h2>
            <p className="infobox-text">
              This website was created to help amateur birdwatchers identify the
              species of birds they find. The machine-learning model used in
              this website was trained on 525 species of birds. The model is
              capable of classifying images of birds with high accuracy. To
              classify an image, simply drag and drop an image or click on the
              upload box and select the image of the bird you found. More than
              likely, you can find the answer you're looking for! There are over
              9700 species of birds, and they can be found in various habitats
              around the world. Birds are known for their colorful plumage,
              melodious songs, and diverse behaviors. Birdwatching is a popular
              hobby that allows people to observe and appreciate the beauty of
              birds in their natural habitats. That being said, it can be
              challenging to identify the species of birds, especially for
              beginners. This website aims to make bird identification easier
              and more accessible to everyone. We are not able to train our
              model on every bird species; however, this should serve as a good
              starting point for bird identification. If you are unable to find
              the species of the bird you are looking for, we recommend
              consulting a field guide or a bird expert for further assistance.
              Happy birdwatching!
              <br />
              <br />
              This website was created by Andrew Mark Dale and Andre Dallaire
              for the final project of AIDI-2000 Applied Machine Learning at
              Durham College.
            </p>

            <div className="image-gridMobile">
              {images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default About;
