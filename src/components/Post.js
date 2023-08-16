import React, { useState } from "react";
import { styled } from "styled-components";
import {
  likeIcon,
  likedIcon,
  editIcon,
  deleteIcon,
} from "../images/IconsIndex";
import postservices from "../services/post.service";

export default function Post({ post }) {
  const [iconelike, setIconelike] = useState(0);

  function formatNames(names){
    
    const shownNames = names.slice(-2).join(', ')
    if (names.length > 2) {
      const remainingCount = names.length - 2;
      return `Curtido por ${shownNames} e mais ${remainingCount} pessoa${remainingCount > 1 ? 's' : ''}`;
    }
    return `Curtido por ${shownNames}`;
  }
  


  
  function darLike(body) {
    const likes = iconelike === 0 ? 1 : 0

    //falta colocar no body o id do usuario que esta logado
    if(likes === 1){
        console.log('post')
        //postservices.likepost(body)
    }else{
        console.log('dellete')
        //postservices.deslike(body)
    }


    setIconelike(likes)
  }
  
  return (
    <PostDiv>
      <LeftContent>
        <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`} />
        <Likes>
          <div onClick={()=> darLike(post.postId)}>
          <Icon src={iconelike === 0 ? likeIcon : likedIcon} alt="Curtir" 
          title={formatNames(post.usersLikedNames)}/>
          <p>{post.usersLikedNames.length + iconelike}</p>
          </div>
        </Likes>
      </LeftContent>
      <MainContent>
        <div>
          <h5>{post.userName}</h5>
          <div>
            <Icon src={editIcon} alt="Editar" />
            <Icon src={deleteIcon} alt="Deletar" />
          </div>
        </div>
        <p>{post.description}</p>
        <p>{post.url}</p>
      </MainContent>
    </PostDiv>
  );
}
const Likes = styled.div``;
const Icon = styled.img``;
const LeftContent = styled.div``;
const MainContent = styled.div``;
const PostDiv = styled.div`
  display: flex;
  padding: 1em;
  border-radius: 1em;
  gap: 0.5em;
  background-color: #171717;

  ${LeftContent} {
    width: 3.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 2em;
    }
    ${Icon} {
      padding-top: 0.6em;
      width: 50%;
      aspect-ratio: auto;
      border-radius: 0em;
      cursor: pointer;
    }
    p {
      font-size: 11px;
    }
  }
  ${MainContent} {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    div {
      display: flex;
      justify-content: space-between;
      div {
        width: 2.75em;
        ${Icon} {
          cursor: pointer;
        }
      }
    }
    p {
      color: #b7b7b7;
    }
  }
`;
