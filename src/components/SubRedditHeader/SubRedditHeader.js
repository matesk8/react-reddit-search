import React from 'react';
import './SubRedditHeader.scss';
import PropTypes from 'prop-types';
import { ReactComponent as SubRedditIcon } from '../../assets/subredditIcon.svg';
import { getYearDifferenceFromNow, unixTimeStampToMilliseconds } from '../../utils/time.util';

class SubRedditHeader extends React.PureComponent {
  render() {
    const { subReddit } = this.props;
    const subRedditData = subReddit.data;
    const subscribersText = `${subRedditData.subscribers.toLocaleString()} subscribers`;

    const createdDateInMilliseconds = unixTimeStampToMilliseconds(subRedditData.created_utc);
    const redditAge = getYearDifferenceFromNow(new Date(createdDateInMilliseconds));

    let ageText = ''; // TODO: extract logic
    const agePostfix = redditAge > 1 ? 'years' : 'year';
    if (redditAge >= 1) {
      ageText = `, a community for ${redditAge} ${agePostfix}`;
    } else {
      ageText = ', a community for less than a year';
    }

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
              { `${subscribersText}${ageText}` }
            </p>
          </span>
        </div>
      </>
    );
  }
}

SubRedditHeader.propTypes = {
  subReddit: PropTypes.object.isRequired,
};

export default SubRedditHeader;
