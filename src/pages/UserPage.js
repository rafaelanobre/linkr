import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import postservices from "../services/post.service";
import { styled } from "styled-components";
import Follow from "../components/follow";
import { TailSpin } from "react-loader-spinner";
import Post from "../components/Post";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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

  function loadPage(page) {
    if (!loading) {
      setLoading(true);
      const page = currentPage + 1;
      const offset = (page - 1) * 10;
      axios.get(`${process.env.REACT_APP_API_URI}/user/${userId}?offset=${offset}`)
        .then((res) => {
          const newPosts = res.data;
          if (newPosts.length === 0) {
            setHasMore(false);
          } else {
            setPosts([...posts, ...newPosts]);
            setCurrentPage(page);
          }
        })
        .catch((err) => {
          console.error('Error fetching posts:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div>
      <Header />
      <ContainerHeader>
        <img src={profile.photo} alt="" />
        <h1>{profile.name}'s posts</h1>
        <Follow id={userId}></Follow>
      </ContainerHeader>
      <PostsList>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadPage}
          hasMore={hasMore}
          loader={<Load key={0}>
            <TailSpin color="#6A459C" height={80} width={80} />
            <Alert>Loading...</Alert>
          </Load>}
        >
          {posts.length === 0 ? (
            <Alert data-test="message">There are no posts yet</Alert>
          ) : (
            <>
              {posts.map((post) => (
                <Post key={post.postId} post={post} />
              ))}
            </>
          )}
        </InfiniteScroll>
      </PostsList>
    </div>
  );
}

const Alert = styled.p``
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
const Load = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
`
