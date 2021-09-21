import React, {useState, useEffect} from 'react';
import {db} from './../../firebase';
import './style.css';
import {Link} from 'react-router-dom'
import Header from '../../Header'
import {Avatar, Badge} from '@material-ui/core';


function Mentors1({postId,photoURL,postUserId,myId,followedFirstName,followedLastName,categoryFollowed,followedMember,year}) {

    const [followersCount, setFollowers]= useState(0);
    const [followingCount, setFollowing]= useState(0);


    useEffect(() => {
        db.collection('follows').where("toId", "==", postUserId).where("read","==", false)
       .onSnapshot(snapshot => (
        setFollowing(snapshot.docs.length)
       ))
   }, []);

   useEffect(() => {
    db.collection('follows').where("idFollowed", "==", postUserId).where("read","==", false)
   .onSnapshot(snapshot => (
    setFollowers(snapshot.docs.length)
   ))
}, []);

    return (
        <>
        
        <div>
        
            
        <div class="content">
        
            <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home" style={{marginTop: "0px"}} role="tabpanel" aria-labelledby="home-tab">
            <ul class="list-group pull-down" id="contact-list">
                <li class="list-group-item">
                    <div class="row w-100">
                        <div class="col-12 col-sm-6 col-md-3 px-0">
                            <img class="card-img-top navbar-brand "  src={photoURL} alt="Profile Image" class="  d-block img-fluid"/>
                        </div>
                        <div class="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                            <span class="fa fa-mobile fa-2x text-success float-right pulse" title="online now"></span>
                            <label style={{marginLeft: "0px"}} class="name lead">{followedFirstName} {followedLastName}</label>
                            <br/> 
                            <span class="fa fa-map-marker fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="5842 Hillcrest Rd"></span>
                            
                            <br/>
                            <span class="fa fa-phone fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="(870) 288-4149"></span>
                            <span class="text-muted small">Year {year}</span>
                            <br/>
                            <span class="fa fa-envelope fa-fw text-muted" data-toggle="tooltip" data-original-title="" title=""></span>
                            <span class="text-muted small text-truncate">ACES: {followedMember}</span>
                            <div >
                                <Link to={`/profile2/${postUserId}`}>
                            <button type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Profile </button>
                            </Link>
                            <button type="button" style={{marginLeft: "5px"}} class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">Unfollow</button>
                            </div>
                            <div>
                            <div class="mt-4" style={{display: "flex",justifyContent: "space-between"}}>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mt-3">
                                        <p class="mb-0 text-muted">Followers</p>
                                        <h4>{followersCount}</h4>

                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-4">
                                    <div class="mt-3">
                                        <p class="mb-0 text-muted">Following</p>
                                        <h4>{followingCount}</h4>

                                    </div>
                                </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>
    
    </div>
</div>
</div>

        </>
    )
}

export default Mentors1
