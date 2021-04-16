import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  border-top: thin solid #fff;
  width: 70%;
  margin: 2% auto;
`;

const Author = styled.h5`
  margin: 1% 0 0 5%;
  text-align: left;
`;

const CommentText = styled.p`
  margin: 1% 0 0 5%;
  text-align: left;
`;

const Comments = (props) => {
  const { comment } = props;

  return (
    <CommentWrapper>
      <Author>{comment.author}:</Author>
      <CommentText>{comment.body}</CommentText>
    </CommentWrapper>
  );
};

export default Comments;
