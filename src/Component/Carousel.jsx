import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Quotes from "../Quotes";
import imgArray from "../Utilities/images";

const SliderCarousel = () => {
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
  );
};

export default SliderCarousel;
