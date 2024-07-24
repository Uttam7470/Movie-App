import { Link } from "react-router-dom";


function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">
          <h3>Movie</h3>
        </Link>
        <ul>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/shows">Tv Shows</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
