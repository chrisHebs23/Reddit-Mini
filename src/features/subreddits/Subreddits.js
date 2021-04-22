import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchSubreddits, subredditsSelector } from "./subredditSlice";
import Reddit from "./reddit.png";
import {
  fetchRedditPosts,
  setSubredditPage,
  redditPostsSelector,
} from "../redditPosts/redditPostsSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubredditsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #c3073f;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c3073f;
    border-radius: 12px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 1%;
`;

const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
  margin: 1% 6%;
  background: transparent;
  padding: 0%;
  color: #fff;
  :hover {
    border-top: 0.3rem solid #c3073f;
    background: rgba(111, 34, 50, 0.5);
  }

  &.active {
    border-top: 0.3rem solid #c3073f;
    border-radius: 5%;
    background: rgba(111, 34, 50, 0.5);
  }
`;

const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin: 2% 2% 5% 2%;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
`;

const Subreddits = (props) => {
  const { subredditPage } = useSelector(redditPostsSelector);
  const { subreddits, loading, hasErrors } = useSelector(subredditsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleClick = (sub) => {
    dispatch(fetchRedditPosts(sub));
    dispatch(setSubredditPage(sub));
  };

  const renderSubreddits = () => {
    if (loading)
      return (
        <SkeletonWrapper>
          <SkeletonTheme color="rgba(192,192,192,0.3)" hightlightColor="#fff">
            <Skeleton duration={5} circle={true} height={50} width={50} />
          </SkeletonTheme>
        </SkeletonWrapper>
      );
    if (hasErrors) return <p>Cannot display recipes...</p>;

    return subreddits.map((subreddit) => (
      <ButtonWrapper key={subreddit.id}>
        <Button
          title={subreddit.title}
          className={
            subredditPage === subreddit.display_name_prefixed
              ? `active ${props.display}`
              : props.display
          }
          onClick={() => handleClick(subreddit.display_name_prefixed)}
        >
          <Icon
            src={subreddit.icon_img ? subreddit.icon_img : Reddit}
            alt={subreddit.title}
            loading="lazy"
          />
          {subreddit.title.length >= 15
            ? `${subreddit.title.substring(0, 15)}...`
            : subreddit.title}
        </Button>
      </ButtonWrapper>
    ));
  };

  return <SubredditsWrapper>{renderSubreddits()}</SubredditsWrapper>;
};

export default Subreddits;
