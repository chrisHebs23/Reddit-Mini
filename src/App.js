import React, { lazy, Suspense, useState } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import subredditsReducer from "./features/subreddits/subredditSlice";
import redditPostsReducer from "./features/redditPosts/redditPostsSlice";
import styled from "styled-components";

// import SearchReddit from "./features/searchReddit/SearchReddit";

const HomePage = lazy(() => import("./features/home"));
const Header = lazy(() => import("./features/header"));

const HTML = styled.div`
  height: inherit;
  &.dark {
    border-color: #6f2232;
    background-color: #1a1a1d;
    color: #fff;
    text-align: center;

    button,
    i,
    h2 {
      color: #fff;
    }
    .shadow {
      box-shadow: 5px 5px rgba(111, 34, 50, 0.8);
    }
  }
  &.light {
    background-color: #fff;
    color: #000;
    text-align: center;

    button,
    i,
    h2 {
      color: #000;
    }
    .shadow {
      box-shadow: 5px 5px rgba(192, 192, 192, 0.7);
    }
  }
`;

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 3.5%;
  right: 10%;
  transform: translate(-50%, -50%);

  p {
    margin: 0 2%;
  }

  @media (max-width: 64rem) {
    top: 6%;
    right: 3%;
    p {
      display: none;
    }
  }
`;

const SlideButton = styled.div`
  background-color: #fff;

  width: 45px;
  height: 20px;
  border-radius: 30px;
  padding: 5px;

  > .inner-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c3073f;
  }
  &.active {
    background: #000;
  }

  &.active > .inner-button {
    margin-left: 20px;
  }
`;

function App() {
  const [display, setDisplay] = useState("dark");
  const [active, setActive] = useState("");

  function displayChange() {
    setDisplay(display === "dark" ? "light" : "dark");
    setActive(active ? "" : "active");
  }

  return (
    <Provider store={store} className="App">
      <HTML className={display}>
        <Layout>
          <Suspense fallback={() => <div>Loading...</div>}>
            <ButtonContainer>
              <p>Dark</p>{" "}
              <SlideButton onClick={() => displayChange()} className={active}>
                <div className="inner-button"></div>
              </SlideButton>
              <p>Light</p>
            </ButtonContainer>
            {/* <button onClick={() => displayChange()}>
              {display.toUpperCase()}
            </button> */}
            <Header display={display} />
            <HomePage display={display} />
          </Suspense>
        </Layout>
      </HTML>
    </Provider>
  );
}

export default App;
