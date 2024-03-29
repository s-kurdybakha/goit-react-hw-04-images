import { useState } from 'react';
import css from './search-bar.module.css';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ search });
    setSearch('');
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>
            <FaSearch />
          </span>
        </button>

        <input
          value={search}
          onChange={handleChange}
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
