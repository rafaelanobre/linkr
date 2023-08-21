import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import searchquery from "../services/Debounce";
import { Link } from "react-router-dom";
import { searchIcon } from "../images/IconsIndex";
export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { photo } = user;

  const [search, setSearch] = useState();
  const [searchResult, setsearchResult] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const debouncetime = 300;

  function searchqueryForm(e){
    e.preventDefault()
    searchquery(search)
    .then((res) => setsearchResult(res))
    .catch((err) => console.log(err));
  }

  const handleSearchClick = () => {
    setShowSearchResults(!showSearchResults);
  };
  
  const handleLinkClick = () => {
    setShowSearchResults(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchquery(search)
        .then((res) => setsearchResult(res))
        .catch((err) => console.log(err));
    }, debouncetime);

    return () => clearTimeout(timer);
  }, [search, setSearch]);

  return (
    <HeaderDiv>
      <Logo>linkr</Logo>
      <ContainerSearch>
        <form onSubmit={searchqueryForm}>
          <SearchBar
            data-test="search"
            type="search"
            placeholder="Search for people"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleSearchClick}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          ></SearchBar>
          <button type="submit">
            <Icon src={searchIcon}></Icon>
          </button>
        </form>

        <ul>
          {searchResult.map((result) => (
            <Link key={result.id} to={`/user/${result.id}`} onClick={handleLinkClick}>
              <Result >{result.name}</Result>
            </Link>
          ))}
        </ul>
      </ContainerSearch>
      <Profile>
        <LogoutButton
          data-test="menu"
          onClick={() => setShowLogout(!showLogout)}
        >
          {showLogout ? "▲" : "▼"}
        </LogoutButton>
        <ProfileImage src={photo} alt="User profile" data-test="avatar" />
        {showLogout && (
          <LogoutOption onClick={() => LogOut()} data-test="logout">
            Logout
          </LogoutOption>
        )}
      </Profile>
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: #171717;
  padding: 10px 20px;
  color: white;

  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 0px 0px 5px 5px;
    position: absolute;
    top: 36px;
    a {
      text-decoration: inherit;
    }
  }
`;
const Icon = styled.img``;

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  form {
    width: 100%;
    display: flex;
    button {
      width: 40px;
      height: 36px;
      background-color: white;
      border-radius: 0px 5px 0px 0px;
      border: none;
    }
  }
`;

const Logo = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 24px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px 0px 0px 0px;
`;

const Result = styled.li`
  color: black;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #e7e7e7;
  :hover {
    background-color: #f0f0f0;
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;

const LogoutOption = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
