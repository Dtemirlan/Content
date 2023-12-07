import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Divisions from './Pages/Divisions';
import Admin from './Pages/Admin';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">My App</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/divisions">Divisions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/divisions" element={<Divisions />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
