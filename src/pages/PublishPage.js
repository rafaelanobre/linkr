import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components'
import Post from '../components/Post';
import { UserContext } from '../Context/Context';
import TrendingHashtags from '../components/Trending';
import Header from '../components/Header';
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "use-interval";

export default function PublishPage() {
    const [posts, setPosts] = useState([]);
    const [trendingHashtags, setTrendingHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [initialPosts, setInitialPosts] = useState([]);
    const [newPostsAvailable, setNewPostsAvailable] = useState(false);
    const [newPostsCount, setNewPostsCount] = useState(0);
    const [userFollows, setUserFollows] = useState([]);

    const { user } = useContext(UserContext);
    const { token } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const handlePostUpdate = (updatedPost) => {
        const updatedPosts = posts.map((post) =>
            post.postId === updatedPost.postId ? updatedPost : post
        );
        setPosts(updatedPosts);
    };

    const fetchPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URI}/posts`, config)
            .then(resp => {
                setPosts(resp.data);
                setInitialPosts(resp.data)
                setLoading(false);
                setNewPostsAvailable(false);
            })
            .catch(error => {
                console.log(error);
                alert("An error occured while trying to fetch the posts, please refresh the page");
            })
    }

    const fetchTrending = () => {
        axios.get(`${process.env.REACT_APP_API_URI}/trending`)
            .then(resp => {
                setTrendingHashtags(resp.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const fetchUserFollows = () => {
        axios.get(`${process.env.REACT_APP_API_URI}/following`, config)
            .then(resp => {
                setUserFollows(resp.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function loadPage(page) {
        if (!loading) {
            setLoading(true);
            const page = currentPage + 1;
            const offset = (page - 1) * 10;
            axios.get(`${process.env.REACT_APP_API_URI}/posts?offset=${offset}`, config)
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


    const handlePublish = () => {
        if (!link) return alert("Please enter a link before publishing!");

        setIsDisabled(true);

        axios.post(`${process.env.REACT_APP_API_URI}/posts`, { url: link, description }, config)
            .then(resp => {
                setLink('');
                setDescription('');
                setIsDisabled(false);
                fetchPosts();
            })
            .catch(error => {
                alert("An error occurred while trying to publish the post");
                setIsDisabled(false);
            });
    };

    useEffect(() => {
        fetchPosts();
        fetchTrending();
        fetchUserFollows();
    }, [])

    useInterval(async () => {
        console.log("Checking for new posts...");
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URI}/posts`)
            const newPosts = res.data;
            const confNewpost = newPosts.filter((newPost) => {
                return !initialPosts.some(
                    (initialPost) => initialPost.postId === newPost.postId
                );
            });

            if (confNewpost.length > 0) {
                //console.log(`${confNewpost.length} new posts available.`);

                setNewPostsCount(confNewpost.length);
                setNewPostsAvailable(true);
            } else {
               // console.log("No new posts available.");
                setNewPostsAvailable(false);
            }
        } catch (error) {
            console.error("Error checking for new posts:", error);
        }
    }, 15000);


    return (
        <>
            <Header />
            <PageTitle>Timeline</PageTitle>
            <PageContainer>
                <MainContent>
                    <NewPostDiv data-test="publish-box">
                        <img src={user.photo} alt={`Foto de ${user.name}`} />
                        <h2>What are you going to share today?</h2>
                        <input
                            data-test="link"
                            type="text"
                            label="Link"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            disabled={isDisabled}
                            placeholder="http://..."
                            required
                        ></input>
                        <input
                            data-test="description"
                            type="text"
                            label="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            disabled={isDisabled}
                            placeholder="Awesome article about #javascript"
                        ></input>
                        <button data-test="publish-btn" onClick={handlePublish}>Publish</button>
                    </NewPostDiv>

                    {newPostsAvailable && (
                        <BTNewPost 
                        data-test="load-btn"
                        onClick={(fetchPosts)}>
                        {newPostsCount} new posts, load more!
                        </BTNewPost>
                    )}

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
                                <Alert data-test="message">
                                    {userFollows.length === 0
                                        ? "You don't follow anyone yet. Search for new friends!"
                                        : "No posts found from your friends"
                                    }
                                </Alert>
                            ) : (
                                <>
                                    {posts.map((post) => (
                                        <Post key={post.postId} post={post} userFollows={userFollows} onUpdate={handlePostUpdate} />
                                    ))}
                                </>
                            )}
                        </InfiniteScroll>
                    </PostsList>
                </MainContent>
                <TrendingHashtags trendingHashtags={trendingHashtags} />
            </PageContainer>
        </>
    )
}
const PageTitle = styled.h1`
    width: 80%;
    margin: auto;

    @media screen and (max-width: 768px) {
        width: 100vw;
        padding-left: 0.5em;
    }
`
const NewPostDiv = styled.div``
const Alert = styled.p``
const PageContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    padding-top: 1em;
    margin: auto;
    gap: 2em;
    min-height: 100vh;
    width: 80%;
    max-width: 100vw;
    @media screen and (max-width: 1020px){
        flex-direction: column;
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;
const BTNewPost = styled.button`
    margin-top: 20px;
    font-family: lato;
    font-size: 16px;
    font-style: normal;
    color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #1877F2;
    height: 65px;
    border-radius: 16px;
    border-color: #1877F2;
    cursor: pointer;
    width: 100%;
  
    &:hover{
    background-color: #0052CC;
    }
   

    @media (max-width: 767px) {
        width: calc(100vw - 45px);
        height: 55px;
    }
`;

const Load = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
`
const MainContent = styled.div`
    ${NewPostDiv}{
        position: relative;
        padding: 1em;
        padding-left: 5em;
        border-radius: 16px;
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        img{
            position: absolute;
            top: 2;
            left: 0;
            width: 10%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 3em;
            margin-left: 0.75em;
            @media screen and (max-width: 768px) {
                width: 15%;
            }
        }

        input{
            padding: 0.5em;
            border-radius: 5px;
            background: #EFEFEF;
            border: none;

            color: #949494;
            font-size: 15px;
            font-weight: 300;
        }

        button{
            cursor: pointer;
            padding: 0.5em;
            align-self: flex-end;
            width: 25%;
            border-radius: 5px;
            background: #1877F2;

            color: #FFF;
            font-size: 14px;
            font-weight: 700;
            border: none;
        }
    }
`
const PostsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding-top: 2em;
    margin-bottom:2em;
    

    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`