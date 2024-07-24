import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar"

import Home from "./Components/Home"
import Movies from "./Components/Movies";
import Shows from "./Components/TvShows"
import SearchResults from "./Components/SearchResults";
import SinglePage from "./Components/SinglePage";
import Footer from "./Components/Footer";




function App() {
 

  
  return (
     <>
      <BrowserRouter>
        <Navbar />
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/movies" element={<Movies/>}></Route>
           <Route path="/shows" element={<Shows/>}></Route>
           <Route path="/search/:searchTerm" element={<SearchResults />}></Route>
           <Route path="/single-page/:media/:id" element={<SinglePage/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
     </>
  )
}

export default App

