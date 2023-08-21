import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import axios from 'axios';

export default function UserPage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    console.log(userId);

    const params = useParams();
    console.log(params);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/user/${userId}`)
            .then(response => {
                console.log('Response:', response.data);
                setUser(response.data);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.log(userId);
                console.error("Erro ao carregar detalhes do usuário:", error);
            });
    }, [userId]);

    return (
        <div>
            <Header />
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    {posts.map(post => (
                        <div key={post.id}>
                            <Post post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
