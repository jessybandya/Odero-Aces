import React, {useState} from 'react';
import Header from './../Header'
import Posts from './../Posts';
import './style.css';
import {auth} from './../firebase';

function Home({user}) {

  
    
    return (
        <div>
            <Header user={user}/>
            <Posts id="navbar"/>
        </div>
    )
}

export default Home
