import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Money Tracker</h1>
                </Link>
                <nav>
                    <a href="/#all-records">All Records</a>
                    <a href="/#add-records">Add Records</a>
                    <a href="/#visualise">Visualise</a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
