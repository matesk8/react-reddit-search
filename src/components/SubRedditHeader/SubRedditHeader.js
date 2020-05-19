import React from 'react';
import './SubRedditHeader.scss';
import PropTypes from 'prop-types';
import { ReactComponent as SubRedditIcon } from '../../assets/subredditIcon.svg';
import { getSubRedditAgeText, getSubscribersText } from '../../utils/reddit.util';
import { getYearDifferenceFromNow, unixTimeStampToMilliseconds } from '../../utils/time.util';

function SubRedditHeader({ subReddit }) {
  const subRedditData = subReddit.data;
  const subscribersText = getSubscribersText(subRedditData.subscribers);
  const createdDateInMilliseconds = unixTimeStampToMilliseconds(subRedditData.created_utc);
  const redditAge = getYearDifferenceFromNow(new Date(createdDateInMilliseconds));
  const ageText = getSubRedditAgeText(redditAge);

  return (
    <>
      <div
        className="subreddit-header"
      >
        <span className="subreddit-header__left-side">
          {subRedditData.icon_img && (
          <img
            className="subreddit-header__icon"
            src={subRedditData.icon_img}
            alt="Reddit icon"
          />
          )}
          {!subRedditData.icon_img && (
          <SubRedditIcon
            className="subreddit-header__icon subreddit-header__icon--svg"
          />
          )}
        </span>
        <span className="subreddit-header__right-side">
          <label className="subreddit-header__label">
            {subRedditData.title}
          </label>
          { subRedditData.public_description && (
            <div className="subreddit-header__description">
              {subRedditData.public_description}
            </div>
          )}
          <p className="subreddit-header__sub-text">
            { `${subscribersText}, ${ageText}` }
          </p>
        </span>
      </div>
    </>
  );
}

SubRedditHeader.propTypes = {
  subReddit: PropTypes.object.isRequired,
};

export default SubRedditHeader;
