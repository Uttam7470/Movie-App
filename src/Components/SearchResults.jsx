import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import {fetchSearchTerm , fetchGenre} from "../Slice/slice"
import SingleCard from "./SingleCard";



function SearchResults() {
    const {searchTerm} = useParams();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSearchTerm(searchTerm))
    },[dispatch,searchTerm])


    const {searchResults , moviesList , tvList  } = useSelector((state)=>{return state.movieReducer})
  

  return (
    <>
      <div className="searchResult-container">
         <h1>{`Search Results for '${searchTerm}'`}</h1>
         <div className="display-movies">
             {searchResults && searchResults.map((movie,index)=>{
                 return  <SingleCard key={index} movie={movie} movieList={moviesList} tvList={tvList} isVisible={true} isProperty={true}/>
             })}
         </div>
      </div>
    </>
  )
}

export default SearchResults