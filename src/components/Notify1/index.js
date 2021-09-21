import React, {useEffect, useState} from 'react';
import './style.css'
import Mentors1 from './Notify1a';

import {auth} from '../firebase'
import {db} from '../firebase'
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';



function Posts() {

    const history = useHistory("");
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);

   const {currentUser} = auth
    // document.title = 'Facebook';
    let { uid } = useParams();
   

    useEffect(() => {
        db.collection('follows').where("idFollowed", "==", `${auth?.currentUser?.uid}`).where("read","==", false).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })
            )
            );
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
        <div style={{marginTop: ""}}>
           {currentUser &&(
          
          posts.map(({ id, post }) => (
              < Mentors1 key={id} postId={id} photoURL={post.profilePic} postUserId={post.toId}  username={post.userName} myId={uid} read={post.read1} empty="This Empty"/>
          ))
          
      
          )} 
          
        </div>
    )
}

export default Posts
