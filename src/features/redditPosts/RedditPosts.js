import React, { useState } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { Comment } from "@styled-icons/boxicons-regular/Comment";
import { Upvote } from "@styled-icons/boxicons-regular/Upvote";
import { Downvote } from "@styled-icons/boxicons-regular/Downvote";

const Postbox = styled.div`
  border: 3px solid #6f2232;
  margin-bottom: 2%;
`;
const Post = styled.div`
  display: flex;
  flex-direction: row;
`;

const Upvotes = styled.div`
  margin: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  margin: 2%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Picture = styled.img`
  display: flex;
  width: 75%;
  height: auto;
  @media (max-width: 64rem) {
    width: 100%;
  }
`;

const Line = styled.div`
  display: inline;
  width: 20%;
  height: 2%;
  left: 43%;
  border-top: 1px solid #fff;
  position: absolute;
`;

const InfoWrapper = styled.div`
  border-top: 1% solid #fff;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-evenly;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CommentIcon = styled(Comment)`
  width: 1.7rem;
  color: orangered;
  :hover {
    width: 2.1rem;
    cursor: pointer;
  }
`;

const CommentText = styled.p`
  margin: 0;
`;

const Vote = styled.h4`
  &.up {
    color: green;
  }
  &.down {
    color: red;
  }
`;

const Up = styled(Upvote)`
  width: 2rem;
  color: #fff;
  &.up {
    color: green;
  }
  :hover {
    color: green;
  }
`;

const Down = styled(Downvote)`
  width: 2rem;
  color: #fff;

  &.down {
    color: red;
  }
  :hover {
    color: red;
  }
`;

const getTimestamp = (time) => {
  const date = new Date(time * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp

  if (hours === 1) {
    return hours + " an hour ago";
  } else if (hours > 1) {
    return hours + " hours ago";
  } else {
    return minutes + " minutes ago";
  }
};

export const RedditPosts = (props) => {
  const { post, displayComments } = props;
  const [vote, setVote] = useState();
  let votes = parseInt(post.ups);

  function setNumber(num) {
    if (num > 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    if (num > 1000000) {
      return `${num / 1000000}M`;
    }

    return num;
  }

  const renderComments = () => {
    if (post.commentsLoading) {
      return <p>Loading...</p>;
    }

    if (post.showComments) {
      return post.comments.map((comment) => (
        <Comments comment={comment} key={comment.id} />
      ));
    }

    if (post.error) {
      <p>Error loading comments</p>;
    }
  };

  return (
    <Postbox key={`pots-${post.id}`}>
      <Post>
        <Upvotes>
          <Up className={vote} onClick={() => setVote("up")} loading="lazy" />
          <Vote className={vote}>{setNumber(votes)} </Vote>
          <Down
            className={vote}
            onClick={() => setVote("down")}
            loading="lazy"
          />
        </Upvotes>
        <ContentWrapper>
          <h3>{post.title}</h3>
          {!post.url_overridden_by_dest ? (
            <p>{post.selftext}</p>
          ) : (
            ((<p>{post.selftext}</p>),
            post.is_video ? (
              <video width="750" height="500" controls autoPlay loading="lazy">
                <source
                  src={post.secure_media.reddit_video.fallback_url}
                  type="video/mp4"
                />
              </video>
            ) : (
              <Picture
                src={post.url_overridden_by_dest}
                alt={post.title}
                loading="lazy"
              />
            ))
          )}
        </ContentWrapper>
      </Post>

      <Line />

      <InfoWrapper>
        <div>
          <p>{post.author}</p>
        </div>
        <div>
          <p>{getTimestamp(post.created_utc)}</p>
        </div>
        <CommentWrapper>
          <CommentIcon onClick={() => displayComments(post.permalink)} />
          <CommentText>{post.num_comments}</CommentText>
        </CommentWrapper>
      </InfoWrapper>
      <div> {renderComments()}</div>
    </Postbox>
  );
};

export default RedditPosts;
