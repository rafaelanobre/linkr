import React, { useState } from "react";
import { styled } from "styled-components";
import { likeIcon, likedIcon, editIcon, deleteIcon,} from "../images/IconsIndex";
import postservices from "../services/post.service";
import { useContext } from "react";
import { UserContext } from "../Context/Context";




export default function Post({ post }){
    const {user} = useContext(UserContext)
    const [iconelike, setIconelike] = useState(0);
    console.log(post)

    function formatNames(names){
      const maxShown = 2;
    
      const shownNames = names.slice(-maxShown).join(', ')
      if (names.length > 2) {
        const remainingCount = names.length - 2;
        return `Curtido por ${shownNames} e mais ${remainingCount} pessoa${remainingCount > 1 ? 's' : ''}`;
      }
      return `Curtido por ${shownNames}`;
    }
    
  
  
    
    function darLike(body) {
      const likes = iconelike === 0 ? 1 : 0
      console.log(user)
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
                        <p>{post.metadata['og:title']}</p>
                        <p>{post.metadata['og:description']}</p>
                        <p>{post.url}</p>
                    </MetadadosText>
                    <img src={post.metadata['og:image']} alt='URL Preview' />
                </Metadados> 
            </MainContent>
        </PostDiv>
    );
};
const Likes = styled.div``;
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

  ${LeftContent}
    width: 3.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
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
