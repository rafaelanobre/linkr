import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import postservices from "../services/post.service";
import { styled } from "styled-components";
import Follow from "../components/follow";
import { TailSpin } from "react-loader-spinner";
import Post from "../components/Post";

export default function UserPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const req = async () => {
      try {
        const response = await postservices.profileUserId(userId);
        setProfile(response.data);
        setLoading(false);

        const userResponse = await postservices.getUserPerfil(userId);
        if (userResponse.data.length === 0) {
          alert("There are no posts yet");
          setLoading(true);
        } else {
          setPosts(userResponse.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do usuário:", error);
      }
    };
    req();
  }, [userId]);

  return (
    <div>
      <Header />
      <ContainerHeader>
        <img src={profile.photo} alt="" />
          <h1>{profile.name}'s posts</h1>
        <Follow id={userId}></Follow>
      </ContainerHeader>
      <PostsList>
        {loading ? (
          <>
            <p>Usuário ainda não tem nenhum post</p>
          </>
        ) : (
          <>
            {posts.length === 0 ? (
              <p>There are no posts yet</p>
            ) : (
              <>
                {posts.map((post) => (
                  <Post key={post.postId} post={post} />
                ))}
              </>
            )}
          </>
        )}
      </PostsList>
    </div>
  );
}

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding-top: 2em;

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
