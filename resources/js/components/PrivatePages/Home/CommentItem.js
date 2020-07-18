import React from "react";
import PropTypes from "prop-types";
import "./HomeScreen.scss";

const CommentItem = props => {

    const { author, content } = props;

    let texts = content.split(' ');
    texts = texts.length>10?texts.slice(9):texts;

    return (
        <p className="demo-comment">
            {`@${author}: ${texts.join(' ')}...`}
        </p>
    )

}

CommentItem.defaultProps = {
    author: '',
    content: '',
};

CommentItem.propTypes = {
    author: PropTypes.string,
    content: PropTypes.string
};
export default CommentItem;