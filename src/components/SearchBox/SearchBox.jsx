import css from './SearchBox.module.css';

const SearchBox = ({ searchFilter, setSearchFilter }) => {
  return (
    <div className={css.search}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="search"
        value={searchFilter}
        onChange={evt => setSearchFilter(evt.target.value)}
        autoFocus
      />
    </div>
  );
};

export default SearchBox;
