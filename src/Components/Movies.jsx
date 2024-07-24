import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovies} from "../Slice/slice"
import SingleCard from "./SingleCard";

function Movies() {

   const dispatch = useDispatch();
   const {movies , moviesList , tvList , moviePage} = useSelector((state)=>{return state.movieReducer})

   useEffect(()=>{
     dispatch(fetchMovies(1));
   },[dispatch]);
 
    useEffect(()=>{
       const handleScroll = ()=>{
        if (  window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            dispatch(fetchMovies(moviePage));
        }
       }
       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
    },[dispatch,moviePage])


  return (
    <>
      <div className="discover-movies-container">
        <div className="heading">
          <h3>Explore Movies</h3>
        </div>
        <div className="display-movies">
            {movies.map((movie,index)=>{
               return <SingleCard key={index} movie={movie} movieList={moviesList} tvList={tvList} isVisible={true} isProperty={true}/>
            })}
        </div>
      </div>
    </>
  );
}

export default Movies;