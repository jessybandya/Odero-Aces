import React, {useEffect, useState} from 'react';
import './style.css'
import Post from './Post';
import {auth} from './../firebase'
import {db} from './../firebase'

import { useHistory } from 'react-router-dom';



function Posts() {

    const history = useHistory("");
    const [posts, setPosts] = useState([]);
   const {currentUser} = auth
    // document.title = 'Facebook';

   

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    console.log(posts)

    const [user, setUser] = useState([]);
    useEffect(() => {
      auth.onAuthStateChanged((authUser) =>{
        if(authUser){
          setUser(authUser)
        }else{
          setUser(false);
        }
      })
    }, [])
    return (
        <div>
           {currentUser &&(
          
          posts.map(({ id, post }) => (
              < Post key={id} 
              photoURL={post.photoURL} 
              currentUser={user}  
              postId={id} 
              user={user} 
              username={post.username} 
              title={post.title}  
              imageUrl={post.imageUrl} 
              noLikes={post.noLikes} 
              postUserId={post.uid} 
              timestamp={post.timestamp}
              caption={post.caption} 
              id={post.id} />
          ))
      
          )} 
          
        </div>
    )
}

export default Posts
