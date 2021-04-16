import React, { lazy, Suspense } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import subredditsReducer from "./features/subreddits/subredditSlice";
import redditPostsReducer from "./features/redditPosts/redditPostsSlice";
import styled from "styled-components";

// import SearchReddit from "./features/searchReddit/SearchReddit";

const HomePage = lazy(() => import("./features/home"));
const Header = lazy(() => import("./features/header"));

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const store = configureStore({
  reducer: combineReducers({
    subreddits: subredditsReducer,
    reddits: redditPostsReducer,
  }),
});

function App() {
  return (
    <Provider store={store} className="App">
      <Layout>
        <Suspense fallback={() => <div>Loading...</div>}>
          <Header />
          <HomePage />
        </Suspense>
      </Layout>
    </Provider>
  );
}

export default App;
