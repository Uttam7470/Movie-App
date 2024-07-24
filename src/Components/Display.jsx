import React, { useState } from "react";
import SingleCard from "./SingleCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";

function Display({
  heading,
  option1,
  option2,
  data1,
  data2,
  movieList,
  tvList,
  isPadding,
  media
}) {
  const [isVisible, setIsVisible] = useState(true);


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
      <div className={isPadding ? `display-container first-container` : `display-container`}>
        <div className="container">
          <h2>{heading}</h2>
          {data1 !== ""  && data2 !== "" ?  <div className="toggle">
            <p
              className={isVisible ? "active toggle-option" : "toggle-option"}
              onClick={() => setIsVisible(true)}
            >
              {data1}
            </p>
            <p
              className={!isVisible ? "active toggle-option" : "toggle-option"}
              onClick={() => setIsVisible(false)}
            >
              {data2}
            </p>
          </div> : ""}
        </div>

        <div className="wrapper-container">
          {/* {isVisible
              ? option1.map((movie, index) => {
                  return  <SingleCard key={index} movie={movie} movieList={movieList} tvList={tvList} isVisible={isVisible}/>;
           
                })
              : option2.map((movie, index) => {
                  return <SingleCard key={index} movie={movie} movieList={movieList} tvList={tvList} isVisible={isVisible} />;
                })} */}

          <Slider {...settings}>
            {isVisible
              ? option1?.map((movie, index) => (
                  <div key={index} >
                    <SingleCard movie={movie} movieList={movieList} tvList={tvList}   isVisible={(data1 !== "" && data2 !== "") ? isVisible : media}  isProperty={false}/>
                  </div>
                ))
              : option2?.map((movie, index) => (
                  <div key={index}>
                    <SingleCard movie={movie}  movieList={movieList} tvList={tvList}  isVisible={(data1 !== "" && data2 !== "") ? isVisible : media}  isProperty={false}/>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Display;