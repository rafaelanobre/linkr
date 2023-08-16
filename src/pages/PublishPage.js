import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { styled } from 'styled-components'
import Post from '../components/Post';

export default function PublishPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URI}/posts`)
        .then(resp =>{
            console.log(resp);
            if (resp.data.length === 0) alert("There are no posts yet")
            setPosts(resp.data);
            setLoading(false);
        })
        .catch(error =>{
            alert("An error occured while trying to fetch the posts, please refresh the page");
        })
    }, [])


    return (
        <>
            <header>Linkr</header>
            <h1>Timeline</h1>
            <div>
                <h3>What are you going to share today?</h3>
                <input type="text" label="Link" required></input>
                <input type="text" label="Descrição"></input>
                <button>Publish</button>
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
        </>
    )
}
const PostsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-top: 2em;
`