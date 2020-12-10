import React from 'react';
import Navbar from './SharedList/Navbar';
import "./Home.css";
import Body from './Body';


const Home = () => {
    return (
        <div className="home">
            <Navbar/>
            <Body/>                
        </div>
    );
};

export default Home;