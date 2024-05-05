import { useEffect, useState } from 'react';
import { apiMovies } from '../../movies-api';
import css from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await apiMovies();
        setMovies(data.results);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.movieMainPage}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {isError && <div>Something went wrong! Please reload this page.</div>}

      {!isLoading &&
        !isError &&
        (movies.length ? (
          <MovieList movies={movies} />
        ) : (
          <p className={css.infoMessage}>Sorry, there no movies to display...</p>
        ))}
    </div>
  );
};

export default Home;