import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Hero() {
  const url = "https://image.tmdb.org/t/p/original";
  const [searchTerm , setSearchTerm] = useState("");
    const [background, setBackground] = useState("");
  const navigate = useNavigate();
  
  const {popularTVShows , loading} = useSelector((state)=>{return state.movieReducer})
  
    // Set a random backdrop image from upcoming movies as background
    useEffect(() => {
      let id;
       id = setInterval(()=>{
        const bg = popularTVShows?.[Math.floor(Math.random() * 20)]
        setBackground(bg);
       },10000)

       return ()=>{
         clearTimeout(id)
       }
    }, [popularTVShows]);
  


  function handleClick(e){
    e.preventDefault();
      navigate("/search/" + searchTerm)
  }




   return (
     <>
     
      <div className="hero-container">
           {!loading && (
          <div className="hero-bg-img">
                  <img src={url + background?.backdrop_path} alt="" loading="lazy" className="hero-bg"/> 
                  <div className="hero-bg-img_1"></div>
                  <div className="hero-bg-img_2"></div>
          </div>
        )}

    
        <div className="hero">
          <h1>Welcome</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          <div className="search">
            <input
              type="text"
              placeholder="Search for a movie or Tv shows ..."
              required
              value={searchTerm}
              onChange={(e)=>{setSearchTerm((e.target.value).toLowerCase())}}
            />
            <button className="btn" onClick={(e)=>{handleClick(e)}}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;