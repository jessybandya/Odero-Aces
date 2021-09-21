import React from 'react'
import Header from './../Header'
import MentorsHeader from './../MentorsHeader'
function Headertest() {
    return (
        <>
        <Header style={{zIndex: "2",position: "fixed",width: "100%",transitionTimingFunction: "ease-in", transition: "all 0.5s"}}/>
        <div style={{marginTop: "50px"}}>
             <MentorsHeader style={{marginTop: ""}}/>
        </div>
        </>
    )
}

export default Headertest
