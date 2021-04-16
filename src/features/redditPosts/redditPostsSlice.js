import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRedditPosts, getRedditComments } from "../../api";

export const initialState = {
  loading: false,
  hasErrors: false,
  redditPosts: [],
  subredditPage: "r/pics/hot",
  searchText: "",
};

const RedditPostsSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    getRedditPostsLoad(state) {
      state.loading = true;
    },
    getRedditPostsSuccess(state, action) {
      state.redditPosts = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getRedditPostsFailure(state) {
      state.loading = false;
      state.hasErrors = true;
    },
    setSearchText(state, { payload }) {
      state.searchText = payload;
    },
    setSubredditPage(state, { payload }) {
      state.searchText = "";
      state.subredditPage = payload;
    },
    toggleDisplayComments(state, action) {
      state.redditPosts[action.payload].showComments = !state.redditPosts[
        action.payload
      ].showComments;
    },
    getCommentsLoad(state, action) {
      state.redditPosts[action.payload].showComments = !state.redditPosts[
        action.payload
      ].showComments;
      if (!state.redditPosts[action.payload].showComments) {
        return;
      }
      state.redditPosts[action.payload].commentsLoading = true;
      console.log("hit load");
    },
    getCommentsSuccess(state, { payload }) {
      state.redditPosts[payload.index].commentsLoading = false;
      state.redditPosts[payload.index].comments = payload.getComments;
      console.log("hit it Success");
    },
    getCommentsFailure(state, action) {
      state.redditPosts[action.payload].commentsLoading = false;
      state.redditPosts[action.payload].errorComments = true;
      console.log("Fail");
    },
  },
});

export const {
  getRedditPostsLoad,
  getRedditPostsSuccess,
  getRedditPostsFailure,
  setSubredditPage,
  setSearchText,
  setSelectedSubreddit,
  toggleDisplayComments,
  getCommentsLoad,
  getCommentsSuccess,
  getCommentsFailure,
} = RedditPostsSlice.actions;

export default RedditPostsSlice.reducer;

export function fetchRedditPosts(subreddit) {
  return async (dispatch) => {
    try {
      dispatch(getRedditPostsLoad());
      const redditPosts = await getRedditPosts(subreddit);
      const postsWithMetadata = redditPosts.map((redditPost) => ({
        ...redditPost,
        showComments: false,
        commentsLoading: false,
        comments: [],
        errorComments: false,
      }));
      dispatch(getRedditPostsSuccess(postsWithMetadata));
    } catch (e) {
      dispatch(getRedditPostsFailure());
      console.log(e);
    }
  };
}

export function fetchRedditComments(index, permalink) {
  return async (dispatch) => {
    try {
      dispatch(getCommentsLoad(index));
      const getComments = await getRedditComments(permalink);
      dispatch(getCommentsSuccess({ index, getComments }));
    } catch (e) {
      dispatch(index, getCommentsFailure(index));
      console.log(e);
    }
  };
}

const selectPosts = (state) => state.reddits.redditPosts;
const selectSearchTerm = (state) => state.reddits.searchText;
export const redditPostsSelector = (state) => state.reddits;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (redditPosts, searchText) => {
    if (searchText !== "") {
      return redditPosts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return redditPosts;
  }
);
