import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiMovieCast } from '../../movies-api';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ActorCard from '../ActorCard/ActorCard';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  
  useEffect(() => {
    
    async function fetchMovieCast() {
      try {
        setIsLoading(true);
        const details = await apiMovieCast(movieId);
        if (details.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovieCast(details);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {isError && <div>Something went wrong! Please reload this page.</div>}
      <ul className={css.list}>
        {movieCast.map((actor => (
          <li className={css.item} key={`${actor.id}`}>
            <ActorCard actor={actor} />
          </li>
        )))}
      </ul>
       {isEmpty && <h3>Ooops! Here is nothing to see!</h3>}
    </div>
  );
};

export default MovieCast;