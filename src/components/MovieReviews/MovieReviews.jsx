import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, getImg} from '../../getInfo';
import { apiMovieReviews } from '../../movies-api';
import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import { errorMes } from '../../services/toaster';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      setIsLoading(true);
      try {
        const reviews = await apiMovieReviews(movieId);
        if (reviews.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovieReviews(reviews);
      } catch (err) {
        errorMes();  
        setIsError(err);
        
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
     <div className={css.container}>
        {isLoading && <Loader />}
        {isError && <div>Something went wrong! Please reload this page.</div>}
          <ul className={css.list}>
              {movieReviews.map((item) => (
                <li className={css.item} key={item.id}>
                  <div className={css.content}>
                    <img
                      className={css.image}
                      src={getImg(item.author_details.avatar_path)}
                      width="120"
                      alt={item.author}
                    />
                    <h3 className={css.author}>{item.author}</h3>
                    <p>{formatDate(item.created_at)}</p>
                  </div>
                  <p>{item.content}</p>
                </li>
              ))}
      </ul>
       {isEmpty && <h3>Ooops! Here is nothing to see!</h3>}
      </div>
  );
};

export default MovieReviews;