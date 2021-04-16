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

const SubredditsWrapper = styled.div`
  margin-top: 2%;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #c3073f;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 1%;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  height: auto;
  flex-direction: column;
  margin: 1%;
  background: transparent;
  color: white;

  :hover {
    border-top: 0.3rem solid #c3073f;
    border-radius: 5%;
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

const Subreddits = () => {
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
    if (loading) return <p>Loading recipes...</p>;
    if (hasErrors) return <p>Cannot display recipes...</p>;

    return subreddits.map((subreddit) => (
      <ButtonWrapper key={subreddit.id}>
        <Button
          title={subreddit.title}
          className={
            subredditPage === subreddit.display_name_prefixed ? "active" : ""
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

  return (
    <>
      {/* <Title>Subreddits</Title> */}
      <SubredditsWrapper>{renderSubreddits()}</SubredditsWrapper>
    </>
  );
};

export default Subreddits;
