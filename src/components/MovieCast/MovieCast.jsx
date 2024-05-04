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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await apiMovieCast(movieId);
        setMovieCast(data.cast);
      } catch (err) {
        setIsError(true);
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
      {!isLoading &&
        !isError &&
        (movieCast.length ? (
          <ul className={css.list}>
            {movieCast.map(actor => {
              return (
                <li className={css.item} key={actor.id}>
                  <ActorCard actor={actor} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={css.infoMessage}>We don't have any cast for this movie.</p>
        ))}
    </div>
  );
};