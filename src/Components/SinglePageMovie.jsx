import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Credits from "./Credits";
import Display from "./Display";
import { useSelector } from "react-redux";

function SinglePageMovie({ singleMovie , singleMovieCredits , singleSimilarMovie , singleRecommendedMovie }) {
  const { tvList , moviesList} = useSelector((state)=>{return state.movieReducer})
  const url = "https://image.tmdb.org/t/p/original";
  function formateDuration(){
    const totalMinutes = singleMovie?.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const formattedTime = `${hours}h ${minutes}m`;

    return formattedTime;
  }

  function dateFormat(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <>
      <div className="singleMoviePage-container">
        <div className="hero-bg-img" style={{ height: "100vh" }}>
          <img
            src={url + singleMovie?.backdrop_path}
            alt=""
            loading="lazy"
            className="hero-bg"
          />
          <div className="singleMoviePage-img_1"></div>
          <div className="singleMoviePage-img_2"></div>
        </div>

        <div className="singleMoviePage">
          <div className="left">
            <div className="single-image">
              <img src={url + singleMovie?.poster_path} alt="" />
            </div>
          </div>

          <div className="single-description">
            <div className="heading">
              <h2>
                {singleMovie?.title ||
                  singleMovie?.original_title ||
                  singleMovie?.name ||
                  singleMovie?.original_name}
                  <span>{` - ${singleMovie?.release_date?.split("-")[0]}`}</span>
              </h2>
              <p>{singleMovie?.tagline}</p>
            </div>

            <div className="single-genre">
               {singleMovie?.genres?.map((data,index)=>{
                 return <p key={index}> {data.name}</p>
               })}
            </div>

            <div className="single-rating">
              <CircularProgressbar
                value={singleMovie?.vote_average ? singleMovie?.vote_average * 10 : 5 * 10}
                text={
                    singleMovie?.vote_average
                    ? singleMovie?.vote_average.toFixed(1)
                    : (5.5).toFixed(1)
                }
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: `${
                    singleMovie?.vote_average > 6.9
                      ? "rgb(0, 128, 0)"
                      : "rgb(255, 165, 0)"
                  }`,
                  textColor: "rgb(0, 128, 0)",
                  textSize: "35px",
                })}
              />
            </div>

             <div className="overview">
                <h3>Overview</h3>
                <p>{singleMovie?.overview}</p>
             </div>

             <div className="optional-info">
                 <p><span>Status: </span><span>{singleMovie?.status}</span></p>
                 <p><span>Release Date: </span>{dateFormat(singleMovie?.release_date)}<span></span></p>
                 <p><span>Runtime: </span><span>{formateDuration()}</span></p>
             </div>
             <hr />

             <div className="optional-info">
                <p><span>Available in : </span> 
                {singleMovie?.spoken_languages?.map((data,index)=>{
                 return <span key={index}> {`${data.english_name} ,`}</span>
               })}
                
                </p>
         
             </div>
             <hr />

             <div className="optional-info">
                <p><span>Production : </span> 
                {singleMovie?.production_companies?.map((data,index)=>{
                 return <span key={index}> {`${data.name} `}</span>
               })}
                </p>
             </div>
             <hr />

          </div>
        </div>
      </div>
      <div className="single-credits-container">
         {singleMovieCredits && <Credits heading={"Top Cast"} option1={singleMovieCredits} isPadding={true}/>}
         </div>

         <div className="single-credits-container">
         {singleSimilarMovie && <Display heading="Similar" data1="" data2="" option1={singleSimilarMovie} option2="" movieList={moviesList} tvList={tvList} isPadding={false} />}
         </div>

         <div className="single-credits-container">
         {singleRecommendedMovie && <Display heading="Recommended" data1="" data2="" option1={singleRecommendedMovie} option2="" movieList={moviesList} tvList={tvList} isPadding={false}/>}
         </div>
    </>
  );
}

export default SinglePageMovie;