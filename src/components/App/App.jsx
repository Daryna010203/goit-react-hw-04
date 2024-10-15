import css from './App.module.css';

import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import ContactForm from '../ContactForm/ContactForm.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

import baseContacts from '../baseContacts.json';

const App = () => {
  const [searchFilter, setSearchFilter] = useState('');

  const [arreyContact, setArreyContact] = useState(() => {
    const stringifiedArreyContact = localStorage.getItem('users');
    const parsedArreyContact =
      JSON.parse(stringifiedArreyContact) ?? baseContacts;
    return parsedArreyContact;
  });

  useEffect(() => {
    const stringifiedArreyContact = JSON.stringify(arreyContact);
    localStorage.setItem('users', stringifiedArreyContact);
  }, [arreyContact]);

  const onAddProfile = formData => {
    const finalUser = {
      ...formData,
      id: nanoid(),
    };

    setArreyContact(prevState => [...prevState, finalUser]);
  };

  const onDeleteProfile = contactId => {
    const updatedUsers = arreyContact.filter(user => user.id !== contactId);

    setArreyContact(updatedUsers);
  };

  const userFilter = arreyContact.filter(contact =>
    contact.name.toLowerCase().includes(searchFilter.toLowerCase().trim())
  );

  return (
    <section>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddProfile={onAddProfile} />
      <SearchBox
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <ContactList userFilter={userFilter} onDeleteProfile={onDeleteProfile} />
    </section>
  );
};

export default App;
