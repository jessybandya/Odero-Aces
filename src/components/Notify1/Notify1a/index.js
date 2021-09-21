import React, {useState, useEffect} from 'react';
import {db} from '../../firebase';
import './style.css';
import {Link} from 'react-router-dom'
import Header from '../../Header'
import {Avatar, Badge} from '@material-ui/core';
import {auth} from './../../firebase';

function Mentors1({postId,photoURL,postUserId,myId,username,categoryFollowed,followedMember,year,read,empty}) {

    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    const {currentUser} = auth


    useEffect(() => {
        db.collection('follows').where('idFollowed', '==', myId).orderBy('timestamp', 'asc').get().then(snapshot => {
            console.log(snapshot)
            setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
        }).catch(error => {
            console.error(error)
        })
    }, []);



    return (
       
        <>
         {read == false &&(
        <div>
        
            
        <div class="content" >
        
            <div class="tab-content profile-tab" id="myTabContent">

            
                               
                                  
                                <ul class="list-group pull-down"  id="contact-list">                                </ul>

                                <Link style={{color: "#1E90FF"}} to={`/profile2/${postUserId}`}>
                <li style={{border: "1px blue solid",background: "#1E90FF",color: "white",marginTop: "0px"}} class="list-group-item">
                    <div  class="row w-100">
                        <div style={{display: "flex"}}  class="col-12 col-sm-6 col-md-3 px-0">
                            <label style={{marginLeft: "0px"}} class="name lead"><i>{username} Started Following you</i></label>
                        </div>
                        
                    </div>
                </li>
                </Link>
                </div>
                </div>
                </div>
                             
                              
                                
                                 )}  


             {read == true &&(
        <div>
        
            
        <div class="content">
        
            <div class="tab-content profile-tab" id="myTabContent">

            
                               
                                  
                                <ul class="list-group pull-down"  id="contact-list">                                </ul>

                                <Link to={`/profile2/${postUserId}`}>
                <li style={{border: "1px blue solid",background: "white",color: "#1E90FF"}} class="list-group-item">
                    <div class="row w-100">
                        <div style={{display: "flex"}} class="col-12 col-sm-6 col-md-3 px-0">
                            <label style={{marginLeft: "0px"}} class="name lead">{username} Started Following you</label>
                        </div>
                        
                    </div>
                </li>
                </Link>
                </div>
                </div>
                </div>
                             
                              
                                
                                 )}                              
                                    
                               
                           </>    
                                
                               
                        
                            
                
            

                
                
           
    


     
    )
}

export default Mentors1
