import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../services/getDate';
import { getImg } from '../../services/getImg';
import { apiMovieReviews } from '../../services/apiMovies';
import css from './MovieReviews.module.css';

import Loader from '../Loader/Loader';

export default function MovieReviews () {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await apiMovieReviews(movieId);
        setMovieReviews(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <div className={css.container}>
        {isLoading && <Loader />}
        {isError && <div>Something went wrong! Please reload this page.</div>}
        {!isLoading &&
          !isError &&
          (movieReviews.length ? (
            <ul className={css.list}>
              {movieReviews.map(review => (
                <li className={css.item} key={review.id}>
                  <div className={css.content}>
                    <img
                      className={css.image}
                      src={getImg(review.author_details.avatar_path)}
                      width="120"
                      alt={review.author}
                    />
                    <h3 className={css.author}>{review.author}</h3>
                    <p>{formatDate(review.created_at)}</p>
                  </div>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.infoMessage}>
              We don't have any reviews for this movie.
            </p>
          ))}
      </div>
    </div>
  );
};

