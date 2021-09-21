import React from 'react';
import Header from './../Header';
import './style.css'

function About({user}) {
    return (
        <>
        <Header user={user}/>
        <div id="navbar1">
            <h1 style={{color: "#1E90FF"}}>This is About page1</h1>
        </div>
        </>
    )
}

export default About
