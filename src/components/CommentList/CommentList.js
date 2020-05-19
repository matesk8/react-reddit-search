import React from 'react';
import PropTypes from 'prop-types';
import './CommentList.scss';
import Comment from '../Comment/Comment';

const classNames = require('classnames');

function CommentList({
  onLoadPreviousComments,
  onLoadNextComments,
  comments,
  currentPage,
  isLastPage,
  isLoading,
}) {
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
          onClick={onLoadPreviousComments}
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
          onClick={onLoadNextComments}
        >
          Next
        </button>
      </div>
    </>
  );
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
