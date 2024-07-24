import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster from "../assets/poster.png";
// import { Grow , Blur } from 'transitions-kit'
// import { AsyncImage } from 'loadable-image'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

function SingleCard({ movie , movieList , tvList , isVisible , isProperty}) {


  const url = "https://image.tmdb.org/t/p/original";

  function dateFormat(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }


  const genreData = isVisible ? movie?.genre_ids?.map (genre =>{
     const list = movieList.find (movies_id => genre === movies_id.id);
     return list ? list.name : "UnKnown Genre"
  }) : movie?.genre_ids?.map (genre =>{
    const list = tvList.find (tv_id => genre === tv_id.id);
    return list ? list.name : "UnKnown Genre"
  })
  // console.log(genreData)
  return (
    <>
      <div className={isProperty ? "card-container card-width" : "card-container"}>
        <Link to={`/single-page/${movie?.media_type ? movie?.media_type : (isVisible ? "movie" : "tv")}/${movie.id}`}>
        <div className="image">
   
          {/* <img
            src={
              movie.poster_path
                ? url + movie.poster_path
                : movie.backdrop_path
                ? url + movie.backdrop_path
                : movie.known_for?.[0]?.poster_path
                ? url + movie.known_for[0].poster_path
                : poster
            }
            alt="movie image"
            loading="lazy"
          /> */}
          {/* <AsyncImage src={ movie.poster_path
                ? url + movie.poster_path
                : movie.backdrop_path
                ? url + movie.backdrop_path
                : movie.known_for?.[0]?.poster_path
                ? url + movie.known_for[0].poster_path
                : poster}
                loader={<div style={{ background: '#888' }}/>}
                Transition={Blur}
                style={{ width: "100%",aspectRatio: 2 / 3 }}
                 loading="lazy"
                /> */}
           
           <LazyLoadImage className={"className" || ""} alt="" effect="blur" src={movie.poster_path
                ? url + movie.poster_path
                : movie.backdrop_path
                ? url + movie.backdrop_path
                : movie.known_for?.[0]?.poster_path
                ? url + movie.known_for[0].poster_path
                : poster}
                loading="lazy" />
          <div className="overlay">
            <div className="rating">
              <CircularProgressbar
                value={movie.vote_average ? movie.vote_average * 10 : 5 * 10}
                text={
                  movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : (5.5).toFixed(1)
                }
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: `${
                    movie.vote_average > 6.9
                      ? "rgb(0, 128, 0)"
                      : "rgb(255, 165, 0)"
                  }`,
                  textColor: "rgb(0, 128, 0)",
                  textSize: "35px",
                })}
              />
            </div>

            <div className="genre">
               {genreData && genreData.map((data,index)=>{
                 return <p key={index}> {data}</p>
               })}
            </div>
          </div>

        </div>
        </Link>

        <div className="movie-info">
          <p>
            {movie.title ||
              movie.original_title ||
              movie.name ||
              movie.original_name}
          </p>
          <p>
            {movie.release_date
              ? dateFormat(movie.release_date)
              : movie.first_air_date
              ? dateFormat(movie.first_air_date)
              : movie.known_for?.[0]?.release_date
              ? dateFormat(movie.known_for[0].release_date)
              : "unKnown"}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingleCard;