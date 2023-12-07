import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosApi.ts';

const EditPage: React.FC = () => {
    const { pageName } = useParams<{ pageName: string }>();
    const [pageTitle, setPageTitle] = useState<string>('');
    const [pageContent, setPageContent] = useState<string>('');
    const [pageCategory, setPageCategory] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/pages/${pageName}`);
                const { title, content, category } = response.data;
                setPageTitle(title);
                setPageContent(content);
                setPageCategory(category);
            } catch (error) {
                console.error('Error fetching page:', error);
            }
        };

        fetchData();
    }, [pageName]);

    const handleSave = async () => {
        try {
            await axios.put(`/pages/${pageName}`, { title: pageTitle, content: pageContent, category: pageCategory });
            navigate(`/admin`);
        } catch (error) {
            console.error('Error saving page:', error);
        }
    };

    return (
        <div>
            <h2>Edit Page - {pageTitle}</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="pageCategory" className="form-label">Page Category</label>
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
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pageTitle" className="form-label">Page Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pageTitle"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pageContent" className="form-label">Page Content</label>
                    <textarea
                        className="form-control"
                        id="pageContent"
                        value={pageContent}
                        onChange={(e) => setPageContent(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditPage;
