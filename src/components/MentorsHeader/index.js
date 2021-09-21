import React from 'react';
import Header from './../Header'
import Mentors1  from './../MentorsFirst'
import Mentors2  from './../MentorsFirst2'



function Mentors({postId,photoURL,postUserId,myId,followedFirstName,followedLastName,categoryFollowed,followedMember}) {
    return (
        

        <>
         <>
<ul class="nav nav-tabs" id="myTab" role="tablist" style={{background: "#7df9ff",maxWidth: "",justifyContent: "",flex: "1",zIndex: "2",position: "fixed",width: "100%",transitionTimingFunction: "ease-in",transition: "all 0.5s",marginLeft: "0px"}}>
                                <li style={{flex: "0.5"}} class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"  aria-selected="true">All Mentors</a>
                                </li>
                                <li style={{flex: "0.5"}}  class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">All Members</a>
                                </li>
                               
                            </ul> 
                            
                            </> 
                                    <div>
            
        <div class="content">
        <div>
            
            </div>
            <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home" style={{marginTop: "50px"}} role="tabpanel" aria-labelledby="home-tab">
            <Mentors1 />
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

export default Mentors
