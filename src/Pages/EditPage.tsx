import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosApi';

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
}

const EditPage: React.FC = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Post>(`/pages/${postId}`);
                setPost(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setCategory(response.data.category);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (postId) {
            fetchData();
        }
    }, [postId]);

    const handleSave = async () => {
        try {
            await axios.put(`/pages/${postId}`, { title, content, category });
            navigate('/admin');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Page</h2>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditPage;
