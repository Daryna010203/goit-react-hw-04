import { Field, Form, Formik, ErrorMessage } from 'formik';

import { AddProfileSchema } from '../schemas';

import css from './ContactForm.module.css';

const initialValues = { name: '', number: '' };

const ContactForm = ({ onAddProfile }) => {
  const handleSubmit = (values, actions) => {
    onAddProfile(values);
    actions.resetForm();
  };
  return (
    <div className={css.list}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddProfileSchema}
      >
        <Form className={css.form}>
          <label>Name</label>
          <Field
            type="text"
            className={css.text}
            name="name"
            placeholder="Laura Vees"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
          <label>Number</label>
          <Field
            type="text"
            className={css.text}
            name="number"
            placeholder="256-17-88"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
          <button type="submit" className={css.addBtn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
