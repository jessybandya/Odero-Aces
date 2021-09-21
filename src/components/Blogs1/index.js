import React from 'react';
import Header from '../Header'
import Blogs from '../Blogs';
import './style.css';

function Home() {
    return (
        <div>
            <Header />
            <Blogs id="navbar"/>
        </div>
    )
}

export default Home
