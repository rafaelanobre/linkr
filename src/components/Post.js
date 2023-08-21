import React, { useState } from "react";
import { styled } from "styled-components";
import { likeIcon, likedIcon, editIcon, deleteIcon,} from "../images/IconsIndex";
import { Link } from "react-router-dom";
import Deletepostmodal from './Deletepostmodal';
import postservices from "../services/post.service";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import {Tooltip} from "react-tooltip";
import { useEffect } from "react";

export default function Post({ post }) {
    const metadata = post.metadata || {};
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { user } = useContext(UserContext);
    const [names, setNames] = useState(post.usersLikedNames);
    const [likes, setLikes] = useState(
        post.usersLikedNames[0] === null ? " " : post.usersLikedNames.length
    );
    const [showName, setshowName] = useState([])

    function formatNames(names) {
        if (names[1] === user.name  && names[0] === null) {
            return "voce curtiu";
        }
        if (names[0] === null) {
            return "";
        }
        if (names.length === 0) {
            return "";
        }
        const userHasLiked = names.includes(user.name);
        const likeCount = names.length;

        if (likeCount === 1) {
            if (userHasLiked) {
                return `Curtido por você`;
            } else {
                return `Curtido por ${names[0]}`;
            }
        }
        const otherPeopleLiked = userHasLiked ? likeCount - 1 : likeCount;
        if (otherPeopleLiked === 1) {
            return `Curtido por você e ${names.filter((nome) => nome !== user.name).join(", ")}`;
        }
        return `Curtido por ${names}`;
    }

    function darLike(postId) {
        const body = {
            postId,
            userliked: user.id,
        };

        if (names.includes(user.name)) {
            postservices
                .deslike(body)
                .then((res) => {
                    const nameDelete = names.filter((nome) => nome !== user.name);
                    setNames(nameDelete);
                    setLikes(likes - 1);
                    const altername = formatNames(nameDelete)
                    setshowName(altername)
                })
                .catch((err) => console.log(err.response  ));
            } else {
                postservices
                    .likepost(body)
                    .then((res) => {
                        const newName = [...names, user.name];
                        setNames(newName);
                        setLikes(likes + 1);
                        const altername = formatNames(newName)
                        setshowName(altername)
                    })
                    .catch((err) => console.log(err.response));
                }
}
    useEffect(() => {
        const altername = formatNames(names); // Calcula o showName com base no estado atualizado
        setshowName(altername);
    }, []);

    return (
        <PostDiv data-test="post">
            <Deletepostmodal isOpen={openDeleteModal} postId={post.postId} setOpenOption={() => setOpenDeleteModal(!openDeleteModal)}/>
            <LeftContent>
                <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />
                <div>
                    <Likes>
                        <div data-test="like-btn" onClick={() => darLike(post.postId, user.id)}>
                        {names.includes(user.name) ? (
                            <Icon
                            src={likedIcon}
                            alt="Curtir"
                            data-tooltip-id={post.postId}
                            />
                        ) : (
                            <Icon
                            src={likeIcon}
                            alt="Curtir"
                            data-tooltip-id={post.postId}
                            />
                        )}
                        
                        <Tooltip
                            data-test="tooltip"
                            key={showName}
                            id={post.postId}
                            place="bottom"
                            content={showName}
                            style={{
                            backgroundColor: "#FFFFFF", // Cor de fundo
                            color: "#505050", // Cor do texto
                            padding: "8px", // Espaçamento interno
                            borderRadius: "4px", // Borda arredondada
                            fontSize: "12px", // Tamanho da fonte
                            }}
                        />
                        <p data-test="counter">{likes} likes</p>
                        </div>
                    </Likes>
                </div>
            </LeftContent>
            <MainContent>
                <div>
                <Link to={`/user/${post.userId}`}><h5 data-test="username">{post.userName}</h5></Link>
                <IconsDiv>
                    <Icon data-test="edit-btn" src={editIcon} alt="Editar" />
                    <Icon data-test="delete-btn" onClick={()=> setOpenDeleteModal(true)} src={deleteIcon} alt='Deletar' />
                </IconsDiv>
                </div>
                <p data-test="description">
                {post.description}{" "}
                {post.hashtags.length > 0 &&
                    post.hashtags.map((hashtag, index) => (
                    <React.Fragment key={hashtag.hashtagId}>
                        <Link to={`/hashtag/${hashtag.hashtag}`} state={hashtag}>
                        #{hashtag.hashtag}
                        </Link>
                        {index !== post.hashtags.length - 1 && " "}
                    </React.Fragment>
                    ))}
                </p>
                {post.metadata ? (
                <Metadados
                    data-test="link"
                    onClick={() => {
                    window.open(post.url, "_blank");
                    }}
                >
                    <MetadadosText>
                    <p>{metadata.title}</p>
                    <p>{metadata.description}</p>
                    <p>{post.url}</p>
                    </MetadadosText>
                    <img src={metadata.image} alt='URL Preview' />
                </Metadados>
                ) : (
                ""
                )}
            </MainContent>
        </PostDiv>
    );
}
const Likes = styled.div``;
const IconsDiv = styled.div``;
const Icon = styled.img``;
const LeftContent = styled.div``;
const MainContent = styled.div``;
const MetadadosText = styled.div``;
const Metadados = styled.div`
    cursor: pointer;
    margin-top: 0.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #4d4d4d;
    border-radius: 0.7em;

    ${MetadadosText} {
        width: calc(100% - 10em);
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;

        p:nth-child(1) {
            color: #cecece;
            font-size: 16px;
        }
        p:nth-child(2) {
            color: #9b9595;
            font-size: 11px;
        }
        p:nth-child(3) {
            color: #cecece;
            font-size: 11px;
        }
    }

    img {
        aspect-ratio: 1;
        object-fit: cover;
        max-width: 10em;
        border-radius: 0em 0.7em 0.7em 0em;
    }
`;
const PostDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
    border-radius: 1em;
    gap: 0.5em;
    background-color: #171717;

    ${LeftContent} {
        max-width: 4.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;

        img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 3em;
        }
        ${Icon} {
            padding-top: 0.6em;
            width: 70%;
            aspect-ratio: auto;
            border-radius: 0em;
            cursor: pointer;
        }
        p {
            text-align: center;
            padding-top: 0.5em;
            font-size: 12px;
        }
    }
    ${MainContent} {
        width: calc(100% - 4.5em);
        max-width: 30em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        a{
            font-weight: 600;
            color: #fff;
            text-decoration: underline #171717;
        }
        div {
            display: flex;
            justify-content: space-between;
        ${IconsDiv} {
            width: 2.75em;
            ${Icon} {
                cursor: pointer;
                @media screen and (max-width: 768px) {
                    width: 1.75em;
                }
            }

        @media screen and (max-width: 768px) {
            width: 4em;
        }
        
    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
}}
`;
