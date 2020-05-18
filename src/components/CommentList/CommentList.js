import React from 'react';
import PropTypes from 'prop-types';
import './CommentList.scss';
import Comment from '../Comment/Comment';

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
    const { comments } = this.props;
    const commentItems = comments.children.map((comment) => (
      <Comment
        key={comment.data.id}
        comment={comment}
      />
    ));

    return (
      <>
        <div className="comment-list__container">
          <ul className="comment-list">
            {commentItems}
          </ul>
        </div>
        <div className="comment-list__actions">
          <button
            className="comment-list__button"
            type="button"
            onClick={this.loadPreviousComments}
          >
            Previous
          </button>
          <button
            className="comment-list__button"
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
};

export default CommentList;
