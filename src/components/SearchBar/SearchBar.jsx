import css from './SearchBar.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

const initialValues = { userSearch: '' };

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    if (!values.userSearch.trim()) {
      toast.error('Enter a search word');
      return;
    }
    onSearch(values.userSearch);

    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            type="text"
            className={css.text}
            name="userSearch"
            placeholder="Search images and photos"
            autoFocus
          />
          <ErrorMessage
            className={css.errorMessage}
            name="userSearch"
            component="span"
          />
          <button type="submit" className={css.addBtn}>
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
