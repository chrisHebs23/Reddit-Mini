import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchRedditPosts,
  redditPostsSelector,
  fetchRedditComments,
  selectFilteredPosts,
  setSearchText,
} from "./redditPosts/redditPostsSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RedditPosts = lazy(() => import("./redditPosts/RedditPosts"));

const PostWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const HomePage = () => {
  const { loading, hasErrors, subredditPage, searchText } = useSelector(
    redditPostsSelector
  );
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRedditPosts(subredditPage));
  }, [dispatch, subredditPage]);

  function displayComments(index) {
    const getComments = (permalink) => {
      dispatch(fetchRedditComments(index, permalink));
    };
    return getComments;
  }

  const page = () => {
    if (loading)
      return (
        <SkeletonTheme color="rgba(192,192,192,0.3)" hightlightColor="#fff">
          <Skeleton count={5} duration={5} height={100} />
        </SkeletonTheme>
      );
    if (hasErrors) return <p>Cannot display posts...</p>;

    if (posts.length === 0) {
      return (
        <div>
          <h2>Nothing Found {searchText}</h2>
          <button onClick={() => dispatch(setSearchText(""))}>Home page</button>
        </div>
      );
    }
    return (
      <div>
        <Suspense fallback={() => <div>Loading...</div>}>
          {posts.map((post, index) => (
            <RedditPosts
              key={post.id}
              post={post}
              index={index}
              displayComments={displayComments(index)}
            />
          ))}
        </Suspense>
      </div>
    );
  };

  return <PostWrapper>{page()}</PostWrapper>;
};

export default HomePage;
