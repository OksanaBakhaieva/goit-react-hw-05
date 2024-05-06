import { useEffect, useState } from 'react';
import { apiMovies } from '../../movies-api';
import css from './HomePage.module.css';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import { noquery, errorMes } from '../../services/toaster';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await apiMovies(page);
        if (results.length === 0) {
          setIsEmpty(true);
          noquery();
          return;
      }
        
        setMovies((prevMovie) => {
          return [...prevMovie, ...results];
        });
        setIsVisible(page < total_pages);
    } catch (error) {
      errorMes();
      setIsError(error);
      
      } finally {
        setIsLoading(false);
      }
    }
  fetchMovies();
  }, [page]);
    
  const handleClick = () => {
    setPage((prevPage) => prevPage + 1)
  }
  return (
    <div className={css.container}>
      <Toaster toastOptions={{
            style: {
              background: '#4e75ff',
              color: '#fff',
            },
          }}/>
        <h2 className={css.title}>Trending today</h2>
          {movies.length > 0 && <MovieList movies={movies}/> }
          {isLoading && <Loader/>}
          {isError && <div>Something went wrong! Please reload this page.</div>}
          {isVisible && <LoadMoreBtn onClick={handleClick} disabled={isLoading}></LoadMoreBtn>}
      </div>
    
  );
};

export default HomePage;