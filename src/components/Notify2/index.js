import React, {useEffect, useState} from 'react';
import './style.css'
import Mentors1 from './Notify1a';

import {auth} from '../firebase'
import {db} from '../firebase'
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';



function Posts({user}) {

    const history = useHistory("");
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);

   const {currentUser} = auth
    // document.title = 'Facebook';
    let { uid } = useParams();
    let { uid1 } = useParams();

   

    useEffect(() => {
        db.collection('comments').where("read","==", false).where("fromId", "!=", uid).where("postUserId", "==", uid).orderBy('fromId', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })
            )
            );
        })
        
    }, []);
    


    console.log(posts)

   
    return (
        <div>
           {currentUser &&(
          
          posts.map(({ id, post }) => (
              < Mentors1 key={id} postId={id} postId1={post.postId}  fromId={post.fromId} photoURL={post.photoURL} postUserId={post.postUserId}  firstName={post.fromFirstName} lastName={post.fromLastName} myId={uid} read={post.read1} empty="This Empty"/>
          ))
          
      
          )} 
          
        </div>
    )
}

export default Posts
