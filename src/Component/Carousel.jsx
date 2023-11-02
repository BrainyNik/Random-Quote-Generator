import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Quotes from "../Quotes";
import imgArray from "../Utilities/images";
import loader from './luffyy.gif'

const SliderCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = imgArray.map((imgSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    Promise.all(imagePromises)
      .then(() => {
        // All images have loaded
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error loading images:", error);
        setIsLoading(false);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="carousel">
      {isLoading ? (
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <p>Loading...</p>
          {/* <div className="di">
            {" "}
            <iframe
              src="https://giphy.com/embed/VApOqITOXZAd2"
              width="480"
              height="480"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/luffy-VApOqITOXZAd2"></a>
            </p>
          </div> */}
        </div>
      ) : (
        <div>
          <Carousel
            arrows={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={30000}
            draggable={false}
            swipeable={false}
            customTransition="all 0.5"
            transitionDuration={700}
            responsive={responsive}
            pauseOnHover={false}
          >
            {imgArray?.map((img, index) => {
              return (
                <div key={index} className="img_container">
                  <img src={img} alt="bg-img" />
                </div>
              );
            })}
          </Carousel>
          
          <Quotes />
        </div>
      )}
    </div>
  );
};

export default SliderCarousel;
