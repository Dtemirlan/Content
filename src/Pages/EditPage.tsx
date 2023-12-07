import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosApi';

const EditPage: React.FC = () => {
    const { pageName } = useParams<{ pageName: string }>();
    const [pageTitle, setPageTitle] = useState<string>('');
    const [pageContent, setPageContent] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/pages/${pageName}`);
                const { title, content } = response.data;
                setPageTitle(title);
                setPageContent(content);
            } catch (error) {
                console.error('Error fetching page:', error);
            }
        };

        fetchData();
    }, [pageName]);

    const handleSave = async () => {
        try {
            await axios.put(`/pages/${pageName}`, { title: pageTitle, content: pageContent });
        } catch (error) {
            console.error('Error saving page:', error);
        }
    };

    return (
        <div>
            <h2>Edit Page - {pageTitle}</h2>
            <label>Title:</label>
            <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
            <label>Content:</label>
            <textarea value={pageContent} onChange={(e) => setPageContent(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditPage;
