import { notify } from '../../services/toaster';
import toast, { Toaster } from "react-hot-toast";
import { Field, Form, Formik } from 'formik';
import { IoSearchSharp } from "react-icons/io5";
import css from './SearchBar.module.css';

const SearchBar = ({ onSetSearchQuery, searchQuery }) => {
  return (
    <>
      <Toaster toastOptions={{
            style: {
              background: '#4e75ff',
              color: '#fff',
            },
          }}/>
    <Formik
      initialValues={{ query: searchQuery ?? '' }}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            notify();
          } else {
            onSetSearchQuery(values.query); 
            actions.resetForm();
          }
        
      }}
    >
      <Form className={css.form}>
          <button className={css.searchBtn} type="submit">
            <IoSearchSharp size={16} />
          </button>
          <Field className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            name="query"
          />                
      </Form>
    </Formik>
    </>
    
  );
};

export default SearchBar;