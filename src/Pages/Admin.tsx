import React, { useState, useEffect } from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import EditPage from './EditPage';
import axios from '../axiosApi';

const Admin: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/pages');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    const handleNavigate = (postId: string) => {
        navigate(`/admin/edit/${postId}`);
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <nav>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <button onClick={() => handleNavigate(post.id)}>Edit {post.title}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <Routes>
                <Route path="edit/:postId" element={<EditPage />} />
            </Routes>
        </div>
    );
};

export default Admin;

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
}
