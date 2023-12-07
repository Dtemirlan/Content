import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosApi';

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
}

const Admin: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pageTitle, setPageTitle] = useState<string>('');
    const [pageContent, setPageContent] = useState<string>('');
    const [pageCategory, setPageCategory] = useState<string>('');
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/pages');
                setPosts(response.data);

                if (postId) {
                    const postToEdit = response.data.find((post: Post) => post.id === postId);
                    if (postToEdit) {
                        setPageTitle(postToEdit.title);
                        setPageContent(postToEdit.content);
                        setPageCategory(postToEdit.category);
                    }
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [postId]);

    const handleNavigate = (postId: string) => {
        navigate(`/admin/edit/${postId}`);
    };

    const handleSave = async () => {
        try {
            if (postId) {
                await axios.put(`/pages/${postId}`, { title: pageTitle, content: pageContent, category: pageCategory });
            } else {
                await axios.post('/pages', { title: pageTitle, content: pageContent, category: pageCategory });
            }

            navigate('/admin');
        } catch (error) {
            console.error('Error saving post:', error);
        }
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
            <h2>{postId ? 'Edit Post' : 'Create New Post'}</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="pageCategory" className="form-label">Post Category</label>
                    <select
                        id="pageCategory"
                        className="form-select"
                        value={pageCategory}
                        onChange={(e) => setPageCategory(e.target.value)}
                    >
                        <option value="home">Home</option>
                        <option value="about">About</option>
                        <option value="contact">Contact</option>
                        <option value="divisions">Divisions</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pageTitle" className="form-label">Post Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pageTitle"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pageContent" className="form-label">Post Content</label>
                    <textarea
                        className="form-control"
                        id="pageContent"
                        value={pageContent}
                        onChange={(e) => setPageContent(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    {postId ? 'Save Changes' : 'Create Post'}
                </button>
            </form>
            <Routes>
                <Route path="edit/:postId" element={<div />} />
            </Routes>
        </div>
    );
};

export default Admin;