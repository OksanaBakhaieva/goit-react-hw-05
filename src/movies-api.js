// API_KEY=d0a6e50b86282614d50c640265680d21

// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGE2ZTUwYjg2MjgyNjE0ZDUwYzY0MDI2NTY4MGQyMSIsInN1YiI6IjY2MzNiZGMyOTU5MGUzMDEyNmJhZDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nw0P_FLQKY69C2IT2c5fzf1Kj7kRnvRvwmMvRx8VRGU

// Trending movies - список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
// https://api.themoviedb.org/3/trending/movie/{time_window}

// Search movie - пошук фільму за ключовим словом на сторінці фільмів.
// https://api.themoviedb.org/3/search/movie

// Movie details - запит повної інформації про фільм для сторінки кінофільму.
// https://api.themoviedb.org/3/movie/{movie_id}

// Movie credits - запит інформації про акторський склад для сторінки кінофільму.
// https://api.themoviedb.org/3/movie/{movie_id}/credits

// Movie reviews - запит оглядів для сторінки кінофільму.
// https://api.themoviedb.org/3/movie/{movie_id}/reviews
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const params = {
  language: 'en-US',
  include_adult: false,
  page: 1,
};
const options = {
  headers: {
    Authorization:
      ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGE2ZTUwYjg2MjgyNjE0ZDUwYzY0MDI2NTY4MGQyMSIsInN1YiI6IjY2MzNiZGMyOTU5MGUzMDEyNmJhZDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nw0P_FLQKY69C2IT2c5fzf1Kj7kRnvRvwmMvRx8VRGU',
  },
};

export const apiMovies = async () => {
  const response = await axios.get("/trending/movie/day?${params}");
  return response.data;
};

export const apiMoviesById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}${params}`);
  return response.data;
};

export const apiMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits?${params}`);
  return response.data;
};

export const apiMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews?${params}`);
  return response.data;
};

export const apiMoviesByQuery = async (query) => {
  const response = await axios.get(`search/movie?query=${query}&${params}`);
  return response.data;
};

