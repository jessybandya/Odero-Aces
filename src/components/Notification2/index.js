import React from 'react'
import Header from '../Header'
import Notify1 from '../Notify2'
function Notifications({user}) {
    return (
        <>
        <Header user={user}/>
        <div style={{marginTop: "50px"}}>
            <Notify1 />
        </div>
        </>
    )
}

export default Notifications
