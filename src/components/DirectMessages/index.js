import React, {useEffect, useState} from 'react'
import './style.css';
import DirectMessages1 from './DirectMessages1';
import Header from './../Header'
import {auth} from '../firebase'
import {db} from '../firebase'
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Profile from './../Profile'


function Ment({user}) {

    let { uid } = useParams();
    const history = useHistory("");
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);
    const {currentUser} = auth


    useEffect(() => {
        db.collection('users1').where("read","==", false).where("toId", "==", `${auth?.currentUser?.uid}`).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })
            )
            );
        })
        
    }, []);


    
    
    return (
        <>
        <Header user={user}/>
        <div style={{marginTop: "50px"}}>
            
        {currentUser &&(
          
          posts.map(({ id, post }) => (
              < DirectMessages1 key={id} 
              message={post.message} 
              fromId={post.fromId}  
              postId={id} 
              user={user} 
              fromPhotoURL={post.fromPhotoURL} 
              fromFirstName={post.fromFirstName}  
              fromLastName={post.fromLastName} 
              read={post.read1} 
              timestamp={post.timestamp}
              myId={user.uid}
               />
          ))
      
          )} 
        </div>
        
        </>
    )
}

export default Ment
