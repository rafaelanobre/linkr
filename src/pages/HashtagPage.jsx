import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components'
import Post from '../components/Post';
import TrendingHashtags from '../components/Trending';
import { useLocation } from 'react-router-dom';

export default function HashtagPage(){
    const [posts, setPosts] = useState([]);
    const [trendingHashtags, setTrendingHashtags] = useState([]);
    const [loading, setLoading] = useState(true);

    let { state } = useLocation();
    const hashtag = state;

    const fetchPosts = ()=>{
        axios.get(`${process.env.REACT_APP_API_URI}/hashtag/${hashtag.id}`)
        .then(resp =>{
            if (resp.data.length === 0) alert("There are no posts yet")
            setPosts(resp.data);
            setLoading(false);
        })
        .catch(error =>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        })
    }

    const fetchTrending=()=>{
        axios.get(`${process.env.REACT_APP_API_URI}/trending`)
        .then(resp =>{
            setTrendingHashtags(resp.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchPosts();
        fetchTrending();
    }, [hashtag])

    return(
        <>
        <h1>#{hashtag.hashtag}</h1>
        <PageContainer>
            <MainContent>
                <PostsList>
                {loading ? (
                        <>
                        <TailSpin color="#6A459C" height={80} width={80} />
                        <p>Loading...</p>
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
            </MainContent>
            <TrendingHashtags trendingHashtags={trendingHashtags}/>
        </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
    display: flex;
    //flex-direction: column;
    justify-content: start;
    align-items: start;
    padding-top: 1em;
    margin: auto;
    gap: 2em;
    min-height: 100vh;
    max-width: 100vw;
    @media screen and (max-width: 1020px){
        flex-direction: column;
    }
`;
const MainContent = styled.div``
const PostsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding-top: 2em;

    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`