import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvShows } from "../Slice/slice";
import SingleCard from "./SingleCard";


function TvShows() {
  const dispatch = useDispatch();
  const { tvShows, moviesList, tvList, tvPage, loading } = useSelector(
    (state) => {
      return state.movieReducer;
    }
  );

  useEffect(() => {
    dispatch(fetchTvShows(1));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        dispatch(fetchTvShows(tvPage));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, tvPage]);

  return (
    <>
      <div className="discover-tvShows-container">
        <div className="heading">
          <h3>Explore TV Shows</h3>
        </div>

        <div className="display-movies">
             {tvShows.map((movie, index) => (
                <SingleCard
                  key={index}
                  movie={movie}
                  movieList={moviesList}
                  tvList={tvList}
                  isVisible={false}
                  isProperty={true}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default TvShows;