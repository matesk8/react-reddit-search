import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';

const ReactMarkdown = require('react-markdown');

function Comment({ comment }) {
  const commentData = comment.data;
  const zerWidthSpaceCharacters = '&#x200B;';
  const selfTextWithoutZeroWidth = (commentData.selftext || '')
    .replace(zerWidthSpaceCharacters, '');

  const postedByPrefix = commentData.crosspost_parent ? 'Crossposted by' : 'Posted by';
  const postedByText = `${postedByPrefix}: ${commentData.author}`;

  return (
    <>
      <li>
        <div className="comment-item">
          <span className="comment-item__left-side">
            <div>
              {commentData.score}
            </div>
            <div className="comment-item__points">
              Points
            </div>
          </span>
          <span className="comment-item__right-side">
            <div className="comment-item__author">
              {postedByText}
            </div>
            <h3 className="comment-item__title">
              {commentData.title}
            </h3>
            {selfTextWithoutZeroWidth && (
              <div className="comment-item__self-text">
                <ReactMarkdown source={selfTextWithoutZeroWidth} />
              </div>
            )}
            <span className="comment-item__link-wrapper">
              <a
                className="comment-item__link"
                href={commentData.url}
              >
                {commentData.permalink}
              </a>
            </span>
          </span>
        </div>
      </li>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
