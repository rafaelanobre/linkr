import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/Context';

export default function Header() {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { photo } = user;

    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <HeaderDiv>
            <Logo>linkr</Logo>
            <SearchBar data-test="search" type="search" placeholder="Search for people"></SearchBar>
            <Profile>
                <LogoutButton data-test="menu" onClick={() => setShowLogout(!showLogout)}>{showLogout ? '▲' : '▼'}</LogoutButton>
                <ProfileImage src={photo} alt="User profile" data-test="avatar"/>
                {showLogout && <LogoutOption onClick={() => LogOut()} data-test="logout">Logout</LogoutOption>}
            </Profile>
        </HeaderDiv>
    )
}

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    background-color: #171717;
    padding: 10px 20px;
    color: white;
`;

const Logo = styled.h1`
    font-family: 'Arial', sans-serif;
    font-size: 24px;
`;

const SearchBar = styled.input`
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    border: none;
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
