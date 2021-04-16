import React, { lazy, Suspense } from "react";
import styled from "styled-components";

const SearchReddit = lazy(() => import("./searchReddit/SearchReddit"));
const Subreddits = lazy(() => import("./subreddits/Subreddits"));

const HeaderWrapper = styled.div`
  margin-bottom: 2%;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Suspense fallback={() => <div>Loading...</div>}>
        <SearchReddit />
        <Subreddits />
      </Suspense>
    </HeaderWrapper>
  );
}

export default Header;
