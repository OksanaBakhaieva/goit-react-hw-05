import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn ({ onLoadMore, children }) {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore} type="button">
      Load More
      {children}
    </button>
  );
};