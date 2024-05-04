import { Link, useLocation } from 'react-router-dom';
import css from "./MovieList.module.css";

export default function MovieList({ movies = [] }) {
  const location = useLocation();
  return (
    <div>
      {movies.length > 0 ? (
        <ul className={css.list}>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                className={css.link}
                state={location}
                to={`/movies/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.infoMessage}>Sorry, there are no movies to display...</p>
      )}
    </div>
  );
}
