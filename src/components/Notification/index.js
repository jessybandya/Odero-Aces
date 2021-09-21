import React, {useEffect, useState} from 'react'
import Header from './../Header'
import Notify1 from './../Notify1'
import {auth} from './../../components/firebase'
function Notifications({user}) {
 
    
    return (
        <>
        <Header user={user} />
        <div style={{marginTop: "50px"}}>
            <Notify1 />
        </div>
        </>
    )
}

export default Notifications
