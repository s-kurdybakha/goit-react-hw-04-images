import { Component } from 'react';
import css from './search-bar.module.css';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
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
  }
}

export default Searchbar;
