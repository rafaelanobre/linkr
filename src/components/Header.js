import React, { useState } from 'react';
import styled from 'styled-components';

export default function Header() {
    const [showLogout, setShowLogout] = useState(false);

    return (
        <HeaderDiv>
            <Logo>linkr</Logo>
            <SearchBar type="search" placeholder="Search for people"></SearchBar>
            <Profile>
                <LogoutButton onClick={() => setShowLogout(!showLogout)}>{showLogout ? '▲' : '▼'}</LogoutButton>
                <ProfileImage src="URL-da-imagem-do-usuario" alt="User profile" />
                {showLogout && <LogoutOption onClick={() => {/* Inserir a função/lógica de logout */}}>Logout</LogoutOption>}
            </Profile>
        </HeaderDiv>
    )
}

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
