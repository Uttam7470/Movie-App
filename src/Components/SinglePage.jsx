
import { useParams } from "react-router-dom"
import SkeletonLayout from "./SkeletonLayout"
import SinglePageMovie from "./SinglePageMovie";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



function SinglePage() {
  const {id , media} = useParams();

  const [singleMovie , setSingleMovie] = useState(null);
  const [singleMovieCredits , setSingleMovieCredits] = useState(null)
  const [singleSimilarMovie , setSingleSimilarMovie] = useState(null)
  const [singleRecommendedMovie , setSingleRecommendedMovie] = useState(null)
  const [loading , setLoading] = useState(false);


  const fetchSingle= async()=>{
     try{
        setLoading(true)
       const response = await fetch(`https://api.themoviedb.org/3/${media}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_video=true&language=en-US`);
       const result  = await response.json();
       setLoading(false)

       setSingleMovie(result)
     }catch(err){
        console.log(err)
     }
  }

  const fetchSingleCredits= async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/credits?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setSingleMovieCredits(result);
    } catch (err) {
      console.error("Error fetching movie videos:", err.message);
    }
  }  

  const fetchSimilar= async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/similar?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setSingleSimilarMovie(result.results);
    } catch (err) {
      console.error("Error fetching movie videos:", err.message);
    }
  }  

  const fetchRecommended= async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}/recommendations?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setSingleRecommendedMovie(result.results);
    } catch (err) {
      console.error("Error fetching movie videos:", err.message);
    }
  }  
  const location = useLocation();

  // Scroll to the top of the page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(()=>{
    fetchSingle()
  },[id])

  useEffect(()=>{
    fetchSingleCredits()
  },[id])

  useEffect(()=>{
    fetchSimilar()
   },[id])

   useEffect(()=>{
    fetchRecommended()
   },[id])


  //  console.log(singleSimilarMovie , singleRecommendedMovie)

  return (
     <> 

      {loading ? <SkeletonLayout /> : <SinglePageMovie singleMovie={singleMovie} singleMovieCredits={singleMovieCredits} singleSimilarMovie={singleSimilarMovie} singleRecommendedMovie={singleRecommendedMovie} />}

     </>
  )
}

export default SinglePage