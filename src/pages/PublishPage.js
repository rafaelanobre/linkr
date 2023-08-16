import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { styled } from 'styled-components'

export default function PublishPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('http://localhost:5000/posts')
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
                            <Post key={post.postId}>
                                <LeftContent>
                                    <img src={post.userPhoto} alt={`Foto de ${post.userPhoto}`}/>
                                    {/* aqui vai os likes */}
                                </LeftContent>
                                <MainContent>
                                    <div>
                                        <h5>{post.userName}</h5>
                                        {/* aqui vao os icones de editar e excluir */}
                                    </div>
                                    <p>{post.description}</p>
                                    <p>{post.url}</p>
                                </MainContent>
                            </Post>
                        ))}
                    </>
                    )}
                </>
            )}
            </PostsList>
        </>
    )
}
const LeftContent = styled.div``
const MainContent = styled.div``
const PostsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-top: 2em;
`
const Post = styled.div`
    display: flex;
    padding: 1em;
    border-radius: 1em;
    gap: 0.5em;
    background-color: #171717;

    ${LeftContent}{
        width: 3.5em;
        display: flex;
        flex-direction: column;
        gap: 1em;

        img{
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 2em;
        }
    }
    ${MainContent}{
        div{
            display: flex;
            justify-content: space-between;
        }
        p{
            color: #B7B7B7;
        }
    }
`