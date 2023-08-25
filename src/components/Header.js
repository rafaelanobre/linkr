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

  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const debouncetime = 300;

  function searchqueryForm(e) {
    e.preventDefault();
    const params = {
      search,
      id: user.id,
    };
    if (search.length >= 3) {
      searchquery(params)
        .then((res) => setsearchResult(res))
        .catch((err) => console.log(err));
    }
  }

  const handleSearchClick = () => {
    setShowSearchResults(!showSearchResults);
  };

  const handleLinkClick = (props) => {
    setShowSearchResults(false);
    setsearchResult([])
    setSearch('')
    navigate(`/user/${props}`)
    
  };

  useEffect(() => {
    const params = {
      search,
      id: user.id,
    };
    const timer = setTimeout(() => {
      if (search.length >= 3) {
        searchquery(params)
          .then((res) => {
            setsearchResult(res);
          })
          .catch((err) => console.log(err));
      }
    }, debouncetime);
 
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <HeaderDiv>
      <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
      <ContainerSearch>
        <form onSubmit={searchqueryForm}>
          <SearchBar
            data-test="search"
            type="search"
            placeholder="Search for people"
            value={search}
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
            <Usernavigate
              key={result.id}
              onClick={()=> handleLinkClick(result.id)}
            >
              <Result>
                <img src={result.photo} />
                {result.name}
                {result.isfollowing === true ? <h1>• following</h1> : ""}
              </Result>
            </Usernavigate>
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
  }
`;
const Icon = styled.img``;
const Usernavigate = styled.div``;

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
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px 0px 0px 0px;
  outline: none;
`;

const Result = styled.li`
  display: flex;
  align-items: center;
  color: black;
  padding: 8px;
  font-weight: 400px;
  font-size: 19px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #e7e7e7;
  :hover {
    background-color: #f0f0f0;
  }
  img {
    width: 39px;
    height: 39px;
    margin-right: 15px;
    border-radius: 304px;
  }
  h1 {
    margin-left: 10px;
    font-size: 19px;
    font-weight: 400;
    color: #C5C5C5;
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
  aspect-ratio: 1;
  object-fit: cover;
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
