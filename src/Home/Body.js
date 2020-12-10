import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
    return (
        <div className="body">
            <h1>Organize your work with Todoist Premium</h1>
            <Link to="/login"><button>Get Started</button></Link>         
            
        </div>
    );
};

export default Body;