import React from 'react';
import './SearchForm.scoped.scss';
import PropTypes from 'prop-types';

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };

    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearchValueChange(event) {
    const { onSearchValueChange } = this.props;
    const searchValue = event.target.value;
    this.setState({
      searchValue,
    });
    onSearchValueChange(searchValue);
  }

  onSearch(event) {
    event.preventDefault();
    const { onSearch } = this.props;
    onSearch();
  }

  render() {
    const { searchValue } = this.state;
    return (
      <>
        <form
          className="search-form"
          onSubmit={this.onSearch}
        >
          <label
            className="search-form__label"
          >
            Subreddit Name:
          </label>
          <input
            className="search-form__input"
            type="text"
            value={searchValue}
            onChange={this.onSearchValueChange}
            placeholder="Enter Subreddit name..."
          />
          <button
            className="primary-button"
            type="submit"
          >
            Find Subreddit
          </button>
        </form>
      </>
    );
  }
}

SearchForm.propTypes = {
  onSearchValueChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
