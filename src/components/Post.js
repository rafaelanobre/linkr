import React, { useState } from "react";
import { styled } from "styled-components";
import {
  likeIcon,
  likedIcon,
  editIcon,
  deleteIcon,
} from "../images/IconsIndex";
import postservices from "../services/post.service";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Post({ post }) {
  const { user } = useContext(UserContext);
  const [iconelike, setIconelike] = useState(0);

  function formatNames(names) {
    
    const maxShown = 2;
    const shownNames = names.slice(-maxShown).join(", ");
    if (names.length > 2) {
      const remainingCount = names.length - 2;
      return `Curtido por ${shownNames} e mais ${remainingCount} pessoa${
        remainingCount > 1 ? "s" : ""
      }`;
    }
    console.log(names)
    if(names[0] === null) return '';
    return `Curtido por ${names}`;
  }

  function darLike(postId) {
    const likes = iconelike === 0 ? 1 : 0;
    const body ={
        postId,
        userliked: user.id
    }
    //falta colocar no body o id do usuario que esta logado
    if (likes === 1) {
      postservices.likepost(body)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
    } else {
      postservices.deslike(body)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
    }

    setIconelike(likes);
  }

  return (
    <PostDiv>
      <LeftContent>
        <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />

        <div>
          {post.usersLikedNames ? (
            <Likes>
              <div onClick={() => darLike(post.postId, user.id)}>
                {post.usersLikedNames.includes(user.name)? 
                (
                  <Icon
                  src={likedIcon}
                  alt="Curtir"
                  data-tooltip-id={post.postId}
                />
                ):
                ( <Icon
                  src={likeIcon}
                  alt="Curtir"
                  data-tooltip-id={post.postId}
                />)}
               
                <ReactTooltip 
                id={post.postId} 
                place="bottom" 
                content={formatNames(post.usersLikedNames)}
                style={{
                  width: '  ',
                  backgroundColor: '#FFFFFFE5', // Cor de fundo
                  color: 'black', // Cor do texto
                  padding: '8px', // Espaçamento interno
                  borderRadius: '4px', // Borda arredondada
                  fontSize: '12px', // Tamanho da fonte
                }}
                />
                {post.usersLikedNames ? (<p>{post.usersLikedNames.length}</p>):(<p>0</p>)}
               
              </div>
            </Likes>
          ) : (
            <Likes>
              <div onClick={() => darLike(post.postId)}>
                <Icon
                  src={iconelike === 0 ? likeIcon : likedIcon}
                  alt="Curtir"
                />
              </div>
            </Likes>
          )}
        </div>
      </LeftContent>
      <MainContent>
        <div>
          <h5>{post.userName}</h5>
          <IconsDiv>
            <Icon src={editIcon} alt="Editar" />
            <Icon src={deleteIcon} alt="Deletar" />
          </IconsDiv>
        </div>
        <p>{post.description}</p>
        <div>
          {post.Metadados ? (
            <Metadados
              onClick={() => {
                window.open(post.url, "_blank");
              }}
            >
              <MetadadosText>
                <p>{post.metadata["og:title"]}</p>
                <p>{post.metadata["og:description"]}</p>
                <p>{post.url}</p>
              </MetadadosText>
              <img src={post.metadata["og:image"]} alt="URL Preview" />
            </Metadados>
          ) : (
            ""
          )}
        </div>
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
  padding: 1em;
  border-radius: 1em;
  gap: 0.5em;
  background-color: #171717;

  ${LeftContent}
  width: 3.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  background-color: #171717;
  max-width: 38em;

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
      width: 50%;
      aspect-ratio: auto;
      border-radius: 0em;
      cursor: pointer;
    }
    p {
      font-size: 12px;
    }
  }
  ${MainContent} {
    max-width: 30em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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
    }
    p {
      color: #b7b7b7;
    }
  }

  @media screen and (max-width: 768px) {
    max-width: 100vw;
  }
`;
