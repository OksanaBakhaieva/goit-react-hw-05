import { Field, Form, Formik } from 'formik';
import { IoSearchSharp } from "react-icons/io5";
import css from './SearchBar.module.css';

export const SearchBar = ({ onSetSearchQuery, searchQuery }) => {
  return (
    <Formik
      initialValues={{ query: searchQuery ?? '' }}
      onSubmit={values => {
        onSetSearchQuery(values.query);
      }}
    >
     <Form className={css.form}>
        <Field
          className={css.input}
          placeholder="Search movie"
          type="text"
          name="query"
        />
        <button className={css.searchBtn} type="submit">
          <FiSearch size={18} />
        </button>
      </Form>
    </Formik>
  );
};
