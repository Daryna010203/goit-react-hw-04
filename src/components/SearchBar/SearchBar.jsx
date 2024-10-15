import css from './SearchBar.module.css';

import React from 'react';

const SearchBar = () => {
  return (
    <div className={css.search}>
      <input className={css.input} type="search" autoFocus />
    </div>
  );
};

export default SearchBar;
