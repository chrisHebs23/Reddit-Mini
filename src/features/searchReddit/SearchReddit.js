import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../redditPosts/redditPostsSlice";
import styled from "styled-components";
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";
import Logo from "./logo.png";

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const LogoDisplay = styled.img`
  margin-left: 5%;
  width: 7rem;
  justify-self: flex-start;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #950740;
  :hover {
    color: white;
  }
`;

const Search = styled(SearchAlt)`
  width: 1.4rem;
`;

const LogoTitle = styled.h2`
  position: absolute;
  left: 9.5rem;
  text-align: left;
  @media (max-width: 64rem) {
    display: none;
  }
`;

const TheForm = styled.form`
  margin: 0 auto;

  @media (max-width: 64rem) {
    display: 0;
  }
`;

const SearchReddit = () => {
  const [term, setTerm] = useState("");
  const searchText = useSelector((state) => state.reddits.searchText);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchText(term));
    setTerm("");
  };

  return (
    <FormWrapper>
      <LogoDisplay src={Logo} alt="Reddit Mini logo" loading="lazy" />
      <LogoTitle>Reddit Mini</LogoTitle>
      <TheForm onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          placeholder="Search"
          value={term}
          onChange={onSearchTermChange}
        />
        <Button type="submit" onClick={handleSubmit} title="Search Button">
          <Search />
        </Button>
      </TheForm>
    </FormWrapper>
  );
};

export default SearchReddit;
