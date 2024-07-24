
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 export const fetchTrending = createAsyncThunk("fetchTrending",async()=>{
      try{
         const [day , week] = await Promise.all([
           axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY),
           axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY)
         ]);
         return {
           trendingMovieByDay: day.data.results,
           trendingMovieByWeek: week.data.results
         }
      }catch(err){
        return err;
      }
 })

 export const fetchPopular = createAsyncThunk("fetchPopular",async()=>{
  try{
     const [movies , TvShows] = await Promise.all([
       axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY),
       axios.get("https://api.themoviedb.org/3/tv/popular?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY)
     ]);
     return {
      popularMovies: movies.data.results,
      popularTVShows: TvShows.data.results
     }
  }catch(err){
    return err;
  }
})

export const fetchTopRated = createAsyncThunk("fetchTopRated",async()=>{
  try{
     const [movies , TvShows] = await Promise.all([
       axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY),
       axios.get("https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key="+import.meta.env.VITE_TMDB_API_KEY)
     ]);
     return {
      topRatedMovies: movies.data.results,
      topRatedTVShows: TvShows.data.results
     }
  }catch(err){
    return err;
  }
})

export const fetchGenre = createAsyncThunk("fetchGenre",async()=>{
   try{
      const [moviesList , tvList] = await Promise.all([
         axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key="+import.meta.env.VITE_TMDB_API_KEY),
         axios.get("https://api.themoviedb.org/3/genre/tv/list?language=en&api_key="+import.meta.env.VITE_TMDB_API_KEY)
      ])
       return{
         moviesList:moviesList.data.genres,
         tvList : tvList.data.genres
       }
   }catch(err){
    return err;
   }
})


export const fetchMovies = createAsyncThunk("fetchMovies",async(moviePage)=>{
   try{
     const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${moviePage}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
     return result.data.results
   }catch(err){
    return err;
   }
})

export const fetchTvShows = createAsyncThunk("fetchTvShows",async(tvPage)=>{
  try{
    const result = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=true&language=en-US&page=${tvPage}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    return result.data.results
  }catch(err){
   return err;
  }
})

export const fetchSearchTerm = createAsyncThunk("fetchSearchTerm",async(searchTerm)=>{
    try{
       const result = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
       return result.data.results;
    }catch(err){
      return err;
    }
})


 const slice = createSlice({
    name:"movieSlice",
    initialState:{
        trendingMovieByDay: [],
        trendingMovieByWeek : [],
        popularMovies:[],
        popularTVShows:[],
        topRatedMovies:[],
        topRatedTVShows:[],
        searchResults:[],
        moviesList:[],
        movies:[],
        tvShows:[],
        tvList:[],
        moviePage:1,
        tvPage:1,
        loading:false,

        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTrending.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchTrending.fulfilled, (state, action) => {
          state.trendingMovieByDay = action.payload.trendingMovieByDay;
          state.trendingMovieByWeek = action.payload.trendingMovieByWeek;
          state.loading = false;
        })
        .addCase(fetchTrending.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        })
        .addCase(fetchPopular.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchPopular.fulfilled, (state, action) => {
          state.popularMovies = action.payload.popularMovies;
          state.popularTVShows = action.payload.popularTVShows;
          state.loading = false;
        })
        .addCase(fetchPopular.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload;
        })
        .addCase(fetchTopRated.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchTopRated.fulfilled, (state, action) => {
          state.topRatedMovies = action.payload.topRatedMovies;
          state.topRatedTVShows = action.payload.topRatedTVShows;
          state.loading = false;
        })
        .addCase(fetchTopRated.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchSearchTerm.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchSearchTerm.fulfilled, (state, action) => {
          state.searchResults = action.payload;
          state.loading = false;
        })
        .addCase(fetchSearchTerm.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchGenre.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchGenre.fulfilled, (state, action) => {
          state.moviesList = action.payload.moviesList;
          state.tvList = action.payload.tvList;
          state.loading = false;
        })
        .addCase(fetchGenre.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchMovies.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          state.movies = [...state.movies, ...action.payload];
          state.moviePage += 1;
          state.loading = false;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchTvShows.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchTvShows.fulfilled, (state, action) => {
          state.tvShows = [...state.tvShows, ...action.payload];
          state.tvPage += 1;
          state.loading = false;
        })
        .addCase(fetchTvShows.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
export const sliceReducer = slice.reducer;