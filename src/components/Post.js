import React from 'react';
import styled from 'styled-components'; // Retirei os {} da importação
import { likeIcon, likedIcon, editIcon, deleteIcon } from '../images/IconsIndex';
import { Link } from'react-router-dom';

export default function Post({ post }){
    const metadata = post.metadata || {};

    return (
        <PostDiv data-test="post">
            <LeftContent>
                <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />
                <Icon src={likeIcon} alt='Curtir' />
                <p>13 likes</p>
            </LeftContent>
            <MainContent>
                <div>
                    <h5>{post.userName}</h5>
                    <IconsDiv>
                        <Icon src={editIcon} alt='Editar' />
                        <Icon src={deleteIcon} alt='Deletar' />
                    </IconsDiv>
                </div>
                <p>
                    {post.description}{' '}
                    {post.hashtags.length > 0 &&
                        post.hashtags.map((hashtag, index) => (
                        <React.Fragment key={hashtag.hashtagId}>
                            <Link to={`/hashtag/${hashtag.hashtag}`} state={hashtag}>
                                #{hashtag.hashtag}
                            </Link>
                            {index !== post.hashtags.length - 1 && ' '}
                        </React.Fragment>
                        ))}
                </p>
                <Metadados onClick={() => {
                    window.open(post.url, '_blank')
                }}>
                    <MetadadosText>
                        <p>{metadata.title}</p> 
                        <p>{metadata.description}</p> 
                        <p>{post.url}</p>
                    </MetadadosText>
                    <img src={metadata.image} alt='URL Preview' /> 
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
        a{
            font-weight: 600;
            color: #fff;
            text-decoration: underline #171717;
        }
    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
`
