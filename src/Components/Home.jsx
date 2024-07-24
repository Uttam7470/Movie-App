

import { useDispatch, useSelector } from "react-redux"
import Hero from "./Hero"
import {fetchTrending , fetchPopular , fetchTopRated , fetchGenre} from "../Slice/slice"
import Display from "./Display"
import { useEffect } from "react";


function Home() {

  const dispatch = useDispatch();
  const {trendingMovieByDay , trendingMovieByWeek , popularMovies , popularTVShows ,topRatedMovies ,topRatedTVShows , tvList , moviesList} = useSelector((state)=>{return state.movieReducer})

  useEffect(()=>{
     dispatch(fetchTrending());
  },[])

  useEffect(()=>{
    dispatch(fetchPopular());
 },[])

 useEffect(()=>{
  dispatch(fetchTopRated());
},[])

useEffect(()=>{
  dispatch(fetchGenre())
},[dispatch])




  return (
    <>
     <Hero />
     <Display heading="Trending" data1="Day" data2="Week" option1={trendingMovieByDay} option2={trendingMovieByWeek} movieList={moviesList} tvList={tvList} isPadding={true}/>
     <Display heading="What's Popular" data1="Movies" data2="TVShows" option1={popularMovies} option2={popularTVShows} movieList={moviesList} tvList={tvList} isPadding={false}/>
     <Display heading="Top Rated" data1="Movies" data2="TVShows" option1={topRatedMovies} option2={topRatedTVShows} movieList={moviesList} tvList={tvList} isPadding={false}/>
     
    </>
  )
}

export default Home