import React from 'react';
import Header from './../Header'
import Mentors1  from './../DirectMessages'
import Mentors2  from './../MentorsFirst2'
import {Avatar, Badge} from '@material-ui/core';



function MessagePageMain({user}) {
    return (
        

        <>
        <Header user={user} style={{background: "#7df9ff",maxWidth: "",justifyContent: "",flex: "1",zIndex: "2",position: "fixed",width: "100%",transitionTimingFunction: "ease-in",transition: "all 0.5s",marginLeft: "0px"}} /> 
         <>
         {/* <Badge badgeContent={4} color="error"> */}
<ul class="nav nav-tabs" id="myTab" role="tablist" style={{background: "#7df9ff",maxWidth: "",justifyContent: "",flex: "1",zIndex: "2",position: "fixed",width: "100%",transitionTimingFunction: "ease-in",transition: "all 0.5s",marginTop: "15px"}}>
                                
                                <li style={{flex: "0.5",border: "1px blue solid"}} class="nav-item">
                                
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"  aria-selected="true">Direct Messages
                                    <div></div>
                                     </a>
                                   

                                </li>
                                <li style={{flex: "0.5",border: "1px blue solid"}}  class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Groups</a>
                                </li>
                               
                            </ul> 
                            {/* </Badge> */}
                            </> 
                                    <div>
            
        <div class="content">
        <div>
            
            </div>
            <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home" style={{marginTop: "50px"}} role="tabpanel" aria-labelledby="home-tab">
            <Mentors1 user={user}/>
        </div>
        <div class="tab-pane fade" style={{marginTop: "50px"}} id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <Mentors2 />
            
        </div>
    </div>
</div>
</div>
</>
        
    )
}

export default MessagePageMain
