import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components'
import Post from '../components/Post';
import { useParams } from 'react-router-dom';

export default function PostByUser() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const parametros = useParams();
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/user/${parametros.id}`)
            .then(resp => {
                console.log(resp);
                if (resp.data.length === 0) alert("There are no posts yet")
                setPosts(resp.data);
                setLoading(false);
            })
            .catch(error => {
                alert("An error occured while trying to fetch the posts, please refresh the page");
            })
    }, [])

    return (
        <All>
            <PageContainer>
                <header>Linkr</header>
                {loading ? <h1>Carregando posts do usuário...</h1> : <h1>{posts[0]?.userName}'s posts</h1>}



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
            </PageContainer>
        </All>
    )
}


const All = styled.div`
    
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    padding-top: 1em;
    margin: auto;
    gap: 2em;
    min-height: 100vh;
    max-width: 100vw;
    h1{
        color: #FFF;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
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
`





