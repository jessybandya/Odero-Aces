import React, {useState, useEffect} from 'react';
import {db} from '../../firebase';
import './style.css';
import {Link} from 'react-router-dom'
import Header from '../../Header'
import {Avatar, Badge} from '@material-ui/core';
import {auth} from './../../firebase';

function Mentors1({postId1,photoURL,postUserId,myId,firstName,lastName,categoryFollowed,followedMember,year,read,empty,fromId}) {

    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    const {currentUser} = auth


    useEffect(() => {
        db.collection('comments').where('postUserId', '==', `${auth?.currentUser?.uid}`).orderBy('timestamp', 'asc').get().then(snapshot => {
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

                                <Link style={{color: "#1E90FF"}} to={`/postview2/${postId1}/${postUserId}/${fromId}`}>
                <li style={{border: "1px blue solid",background: "#1E90FF",color: "white",marginTop: "0px"}} class="list-group-item">
                    <div  class="row w-100">
                        <div style={{display: "flex",alignItems: "center"}}  class="col-12 col-sm-6 col-md-3 px-0">
                            <label style={{marginLeft: "0px"}} class="name lead" style={{alignItems: "center"}}><i> <Avatar src={photoURL}/> {firstName} {lastName} Commented on your post</i></label>
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

                                <Link to={`/postview2/${postId1}/${postUserId}/${fromId}`}>
                <li style={{border: "1px blue solid",background: "white",color: "#1E90FF"}} class="list-group-item">
                    <div class="row w-100">
                        <div style={{display: "flex"}} class="col-12 col-sm-6 col-md-3 px-0">
                            <label style={{marginLeft: "0px"}} class="name lead"><Avatar src={photoURL}/> {firstName} {lastName} Commented on your post</label>
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
