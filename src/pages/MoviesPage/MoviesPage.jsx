import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import MovieList from "../../components/MovieList/MovieList";
import { apiMoviesByQuery } from "../../movies-api";
import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null)
      return;

    async function fetchMoviesByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await apiMoviesByQuery(searchQuery);
        if (data.results.length === 0) {
          return (`Please, input query!`);
        }
        setMovies(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery();
  }, [searchQuery]);
  
  const onSetSearchQuery = searchTerm => {
    if (searchTerm.trim().length === 0) {
      return (`Please, input query!`);
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <h2 className={css.title}>Movies Page</h2>
      <SearchBar
        searchQuery={searchQuery}
        onSetSearchQuery={onSetSearchQuery}
      />
      {isError && <div>Something went wrong! Please reload this page.</div>}
      {isLoading && <Loader />}

      {!isError && !isLoading && movies.length > 0 && (
        <div className={css.list}>
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
}
