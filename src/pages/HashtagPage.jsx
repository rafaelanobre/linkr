import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components'
import Post from '../components/Post';
import TrendingHashtags from '../components/Trending';
import { useLocation, useParams } from 'react-router-dom';

export default function HashtagPage(){
    const [posts, setPosts] = useState([]);
    const [trendingHashtags, setTrendingHashtags] = useState([]);
    const [loading, setLoading] = useState(true);

    const {hashtag} = useParams();

    let { state } = useLocation();
    const tag = state;

    const fetchPosts = ()=>{
        if(!tag || !tag.id){
            return setLoading(false);
        }
        axios.get(`${process.env.REACT_APP_API_URI}/hashtag/${tag.id}`)
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
    }, [tag])

    return(
        <>
        <h1 data-test="hashtag-title">{tag ? `#${tag.hashtag}` : `#${hashtag}`}</h1>
        <PageContainer>
            <MainContent>
                <PostsList>
                {loading ? (
                        <>
                        <TailSpin color="#6A459C" height={80} width={80} />
                        <Alert>Loading...</Alert>
                        </>
                    ) : (
                    <>
                        {posts.length === 0 ? (
                            <Alert>There are no posts with this hashtag yet</Alert>
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
const Alert = styled.p``
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
    ${Alert}{
        font-family: Oswald;
        font-size: 24px;
    }

    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`