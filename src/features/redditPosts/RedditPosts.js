import React, { useState } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { Comment } from "@styled-icons/boxicons-regular/Comment";
import { Upvote } from "@styled-icons/boxicons-regular/Upvote";
import { Downvote } from "@styled-icons/boxicons-regular/Downvote";

const Postbox = styled.div`
  border-width: 3px;
  border-style: solid;
  margin-bottom: 2%;
`;
const Post = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: wrap;
  word-wrap: break-word;
`;

const Upvotes = styled.div`
  margin: 0 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  margin: 2%;
  display: flex;
  width: 95%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-wrap: wrap;
  @media (max-width: 42rem) {
    width: 88%;
  }
`;
const Text = styled.p`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  white-space: break-spaces;
  overflow-wrap: break-word;
`;

const Picture = styled.img`
  display: flex;
  max-width: 100%;
  min-width: 50%;
  height: auto;
  aspect-ratio: auto;
  @media (max-width: 64rem) {
    max-width: 75%;
    min-width: 20%;
    height: auto;
  }
`;

const Line = styled.div`
  display: inline;
  width: 20%;
  height: 2%;
  left: 43%;
  border-top: 1px solid;
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
  @media (max-width: 64rem) {
    font-size: 0.8rem;
  }
`;

const Up = styled(Upvote)`
  width: 2rem;
  height: 2rem;

  &.up {
    color: green;
  }
  :hover {
    color: green;
  }
  @media (max-width: 64rem) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const Down = styled(Downvote)`
  width: 2rem;
  height: 2rem;

  &.down {
    color: red;
  }
  :hover {
    color: red;
  }
  @media (max-width: 64rem) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const PostTitle = styled.h3`
  margin: 3% 0;
  width: 100%;
  height: 100%;
  @media (max-width: 64rem) {
    width: 95%;
    font-size: 1.2rem;
  }
`;

const getTimestamp = (time) => {
  const date = new Date(time * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = date.getMinutes();
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
    <Postbox key={`pots-${post.id}`} className="shadow">
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
          <PostTitle>{post.title}</PostTitle>
          {!post.url_overridden_by_dest ? (
            <Text className="text">{post.selftext}</Text>
          ) : (
            ((<Text>`${post.selftext}`</Text>),
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
                width="1000"
                height="400"
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
