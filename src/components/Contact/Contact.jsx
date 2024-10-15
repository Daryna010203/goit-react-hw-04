import css from './Contact.module.css';
import { FaUserLarge, FaPhone } from 'react-icons/fa6';

const Contact = ({ name, number, id, onDeleteProfile }) => {
  return (
    <>
      <div>
        <div className={css.box}>
          <FaUserLarge />
          <span>{name}</span>
        </div>
        <div>
          <FaPhone />
          <span>{number}</span>
        </div>
      </div>
      <div className={css.Btn}>
        <button type="button" onClick={() => onDeleteProfile(id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Contact;
