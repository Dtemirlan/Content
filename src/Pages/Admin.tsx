import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EditPage from './EditPage';

const Admin: React.FC = () => {
    return (
        <div>
            <h2>Admin Page</h2>
            <nav>
                <ul>
                    <li><Link to="/admin/edit/home">Edit Home</Link></li>
                    <li><Link to="/admin/edit/about">Edit About</Link></li>
                    <li><Link to="/admin/edit/contact">Edit Contact</Link></li>
                    <li><Link to="/admin/edit/divisions">Edit Divisions</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="edit/:pageName" element={<EditPage />} />
            </Routes>
        </div>
    );
};

export default Admin;
