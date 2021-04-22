import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../redditPosts/redditPostsSlice";
import styled from "styled-components";
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";

const FormWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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
  margin
`;

const LogoTitle = styled.h2`
  position: absolute;
  margin-left: 3%;
  left: 9.5rem;

  @media (max-width: 64rem) {
    display: none;
  }
`;

const TheForm = styled.form`
  position: absolute;
  left: 50%;
  padding: 0;
  margin: 0;

  input {
    width: 72%;
    float: left;
  }
  @media (max-width: 64rem) {
    left: 3%;
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
