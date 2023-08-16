import React from 'react';
import { styled } from 'styled-components';
import { likeIcon, likedIcon, editIcon, deleteIcon } from '../images/IconsIndex';

export default function Post({ post }){
    return (
        <PostDiv>
            <LeftContent>
                <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />
                <Icon src={likeIcon} alt='Curtir' />
                <p>13 likes</p>
            </LeftContent>
            <MainContent>
                <div>
                    <h5>{post.userName}</h5>
                    <div>
                        <Icon src={editIcon} alt='Editar' />
                        <Icon src={deleteIcon} alt='Deletar' />
                    </div>
                </div>
                <p>{post.description}</p>
                <p>{post.url}</p>
            </MainContent>
        </PostDiv>
    );
};

const Icon = styled.img``;
const LeftContent = styled.div``;
const MainContent = styled.div``;
const PostDiv = styled.div`
    display: flex;
    padding: 1em;
    border-radius: 1em;
    gap: 0.5em;
    background-color: #171717;

    ${LeftContent}{
        width: 3.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;

        img{
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 2em;
        }
        ${Icon}{
            padding-top: 0.6em;
            width: 50%;
            aspect-ratio: auto;
            border-radius: 0em;
            cursor: pointer;
        }
        p{
            font-size: 11px;
        }
    }
    ${MainContent}{
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        div{
            display: flex;
            justify-content: space-between;
            div{
                width: 2.75em;
                ${Icon}{
                    cursor: pointer;
                }
            }
        }
        p{
            color: #B7B7B7;
        }
    }
`