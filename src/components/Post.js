import React from 'react';
import styled from 'styled-components'; 
import { likeIcon, likedIcon, editIcon, deleteIcon } from '../images/IconsIndex';
import { useNavigate } from 'react-router-dom';

export default function Post({ post }){
    const metadata = post.metadata || {};
    const navigate = useNavigate();

    console.log(metadata);

    const handleUserPage = (event) => {
        event.stopPropagation();
        navigate(`/user/${post.userId}`);
    }

    return (
        <PostDiv>
            <LeftContent>
                <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />
                <Icon src={likeIcon} alt='Curtir' />
                <p>13 likes</p>
            </LeftContent>
            <MainContent>
                <div>
                    <h5 onClick={handleUserPage}>{post.userName}</h5>
                    <IconsDiv>
                        <Icon src={editIcon} alt='Editar' />
                        <Icon src={deleteIcon} alt='Deletar' />
                    </IconsDiv>
                </div>
                <p>{post.description}</p>
                <Metadados onClick={() => {
                    window.open(post.url, '_blank')
                }}>
                    <MetadadosText>
                        <p>{metadata['og:title']}</p> 
                        <p>{metadata['og:description']}</p> 
                        <p>{post.url}</p>
                    </MetadadosText>
                    <img src={metadata['og:image']} alt='URL Preview' /> 
                </Metadados>
            </MainContent>
        </PostDiv>
    );
};


const IconsDiv = styled.div``;
const Icon = styled.img``;
const LeftContent = styled.div``;
const MainContent = styled.div``;
const MetadadosText = styled.div``
const Metadados = styled.div`
    cursor: pointer;
    margin-top: 0.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #4D4D4D;
    border-radius: 0.7em;

    ${MetadadosText}{
        width: calc(100% - 10em);
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;

        p:nth-child(1) {
            color: #CECECE;
            font-size: 16px;
        }
        p:nth-child(2) {
            color: #9B9595;
            font-size: 11px;
        }
        p:nth-child(3) {
            color: #CECECE;
            font-size: 11px;
        }
    }                   

    img{
        aspect-ratio: 1;
        object-fit: cover;
        max-width: 10em;
        border-radius: 0em 0.7em 0.7em 0em;
    }
`
const PostDiv = styled.div`
    display: flex;
    padding: 1em;
    border-radius: 1em;
    gap: 0.5em;
    background-color: #171717;
    max-width: 38em;

    ${LeftContent}{
        max-width: 4.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;

        img{
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 3em;
        }
        ${Icon}{
            padding-top: 0.6em;
            width: 50%;
            aspect-ratio: auto;
            border-radius: 0em;
            cursor: pointer;
        }
        p{
            font-size: 12px;
        }
    }
    ${MainContent}{
        max-width: 30em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        div{
            display: flex;
            justify-content: space-between;
            ${IconsDiv}{
                width: 2.75em;
                ${Icon}{
                    cursor: pointer;
                    @media screen and (max-width: 768px) {width: 1.75em;}
                }

                @media screen and (max-width: 768px) {width: 4em;}
            }
        }
        p{
            color: #B7B7B7;
        }
    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
`
