import React from 'react';
import PropTypes from 'prop-types';
import './CommentList.scss';
import Comment from '../Comment/Comment';

const classNames = require('classnames');

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.loadPreviousComments = this.loadPreviousComments.bind(this);
    this.loadNextComments = this.loadNextComments.bind(this);
  }

  loadPreviousComments() {
    const { onLoadPreviousComments } = this.props;
    onLoadPreviousComments();
  }

  loadNextComments() {
    const { onLoadNextComments } = this.props;
    onLoadNextComments();
  }

  render() {
    const { comments, currentPage, isLastPage, isLoading } = this.props;
    const commentItems = comments.children.map((comment) => (
      <Comment
        key={comment.data.id}
        comment={comment}
      />
    ));

    return (
      <>
        { isLoading && <div className="comment-list__loading-overlay" /> }
        <div className="comment-list__container">
          <ul className="comment-list">
            {commentItems}
          </ul>
        </div>
        <div className="comment-list__actions">
          <button
            disabled={currentPage === 1}
            className={classNames(
              'comment-list__button',
              { 'comment-list__button--disabled': currentPage === 1 }
            )}
            type="button"
            onClick={this.loadPreviousComments}
          >
            Previous
          </button>
          <button
            disabled={isLastPage}
            className={classNames(
              'comment-list__button',
              { 'comment-list__button--disabled': isLastPage }
            )}
            type="button"
            onClick={this.loadNextComments}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.object.isRequired,
  onLoadNextComments: PropTypes.func.isRequired,
  onLoadPreviousComments: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CommentList;
