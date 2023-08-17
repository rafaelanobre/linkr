import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components'
import Post from '../components/Post';
import { UserContext } from '../Context/Context';

export default function PublishPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const { user } = useContext(UserContext);
    const { token } = user;
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const fetchPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URI}/posts`)
        .then(resp =>{
            if (resp.data.length === 0) alert("There are no posts yet")
            setPosts(resp.data);
            setLoading(false);
        })
        .catch(error =>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        })
    }

    const handlePublish = () => {
        if (!link) return alert("Please enter a link before publishing!");

        setIsDisabled(true);

        axios.post(`${process.env.REACT_APP_API_URI}/posts`, { url:link, description }, config)
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

    useEffect(()=>{
        fetchPosts();
    }, [])


    return (
        <PageContainer>
            <header>Linkr</header>
            <h1>Timeline</h1>
            <div>
                <h3>What are you going to share today?</h3>
                <input 
                    type="text" 
                    label="Link" 
                    value={link}
                    onChange={e => setLink(e.target.value)} 
                    disabled={isDisabled}
                    placeholder="http://..."
                    required 
                ></input>
                <input 
                    type="text" 
                    label="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Awesome article about #javascript"
                ></input>
                <button onClick={handlePublish}>Publish</button>
            </div>

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
    )
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 1em;
    margin: auto;
    gap: 2em;
    min-height: 100vh;
    max-width: 100vw;
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
