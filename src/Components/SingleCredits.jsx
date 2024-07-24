import profile from "../assets/profile.png"

function SingleCredits({cast}) {
    const url = "https://image.tmdb.org/t/p/original";
  return (
   <>
    <div className="single-credits">
        <div className="image">
            <img src={cast?.profile_path === null ? profile : url + cast?.profile_path} alt="" />
        </div>
        <div className="actor-name">
        <p>{cast?.character?.split("/")[0]}</p>
        <p>{cast?.name}</p>
        </div>
    </div>
   </>
  )
}

export default SingleCredits