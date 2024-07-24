import React, { useState } from "react";
import SingleCredits from "./SingleCredits";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Credits({
  heading,
  option1,
  isPadding
}) {



  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 6,
    slidesToScroll: 5,

    autoplaySpeed: 200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
         
          infinite: true,
          dots: false,
         
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
         
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        }
      }
    ]
  };

  return (
    <>
      <div className={isPadding ? `display-container first-Credits` : `display-container`}>
        <div className="container">
          <h2 style={{paddingTop:'250px'}}>{heading}</h2>
        </div>
        <div className="wrapper-container">
          <Slider {...settings}>
            {option1?.cast.map((cast, index) => (
                  <div key={index} >
                    <SingleCredits cast={cast}/>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Credits;