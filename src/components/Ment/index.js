import React, {useEffect, useState} from 'react'
import './style.css';
import Header from './../Header'
import {auth} from './../../components/firebase'
import MentorsHeader from './../MentorsHeader'

function Ment({user}) {
    
    return (
        <div>
            <Header user={user} style={{background: "#7df9ff",maxWidth: "",justifyContent: "",flex: "1",zIndex: "2",position: "fixed",width: "100%",transitionTimingFunction: "ease-in",transition: "all 0.5s",marginLeft: "0px"}} /> 
            <div style={{marginTop: "50px"}} >
            <MentorsHeader id="navbar"/>

            </div>

        </div>
    )
}

export default Ment
