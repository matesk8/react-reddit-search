import React from 'react';
import './SearchForm.scss';
import PropTypes from 'prop-types';

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subRedditName: '',
    };

    this.onSubRedditNameChange = this.onSubRedditNameChange.bind(this);
    this.onSearchForSubReddit = this.onSearchForSubReddit.bind(this);
  }

  onSubRedditNameChange(event) {
    const { onSubRedditNameChange } = this.props;
    const subRedditName = event.target.value;
    this.setState({
      subRedditName,
    });
    onSubRedditNameChange(subRedditName);
  }

  onSearchForSubReddit(event) {
    event.preventDefault();
    const { onSearchForSubReddit } = this.props;
    onSearchForSubReddit();
  }

  render() {
    const { subRedditName } = this.state;
    return (
      <>
        <form
          className="search-form"
          onSubmit={this.onSearchForSubReddit}
        >
          <label
            className="search-form__label"
          >
            Subreddit Name:
          </label>
          <input
            className="search-form__input"
            type="text"
            value={subRedditName}
            onChange={this.onSubRedditNameChange}
            placeholder="Enter Subreddit name..."
          />
          <button
            className="search-form__button"
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
  onSubRedditNameChange: PropTypes.func.isRequired,
  onSearchForSubReddit: PropTypes.func.isRequired,
};

export default SearchForm;
