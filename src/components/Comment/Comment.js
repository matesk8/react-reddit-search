import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scoped.scss';
import { getCreatedTimeAgoText, unixTimeStampToMilliseconds } from '../../utils/time.util';

const ReactMarkdown = require('react-markdown');

function Comment({ comment }) {
  const commentData = comment.data;
  const createdDateInMilliseconds = unixTimeStampToMilliseconds(commentData.created_utc);
  const createdDate = new Date(createdDateInMilliseconds);
  const createdTimeText = getCreatedTimeAgoText(Date.now(), createdDate);

  const zerWidthSpaceCharacters = '&#x200B;';
  const selfTextWithoutZeroWidth = (commentData.selftext || '')
    .replace(zerWidthSpaceCharacters, '');

  const postedByPrefix = commentData.crosspost_parent ? 'Crossposted by' : 'Posted by';
  const postedByText = `${postedByPrefix}: ${commentData.author} ${createdTimeText}`;

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
