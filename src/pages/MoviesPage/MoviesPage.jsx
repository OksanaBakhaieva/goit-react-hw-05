import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import MovieList from "../../components/MovieList/MovieList";
import { apiMoviesByQuery } from "../../movies-api";
import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { noquery } from "../../services/toaster";


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery === null)
      return;

    async function fetchMoviesByQuery() {
      try {
        setIsLoading(true);
        const data = await apiMoviesByQuery(searchQuery);
        if (data.results.length === 0) {
          return (`Please, input query!`);
        }
        setMovies(data.results);
      } catch (err) {
        noquery();
        setIsError(err);
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
    <>
      <div className="css.moviesContainer">
        
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
    </>
    
  );
}

export default MoviesPage;