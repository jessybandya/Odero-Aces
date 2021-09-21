import React, {useEffect, useState} from 'react';
import './style.css'
import Mentors1 from './Mentors1';
import Mentors2 from './Mentors2';

import {auth} from '../firebase'
import {db} from '../firebase'

import { useHistory } from 'react-router-dom';



function Posts() {

    const history = useHistory("");
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);

   const {currentUser} = auth
    // document.title = 'Facebook';

   

    useEffect(() => {
        db.collection('users').where("read","==", "true").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })
            )
            );
        })
        
    }, []);

    useEffect(() => {
      db.collection('users').where("read","==", "true").onSnapshot(snapshot1 => {
          setPosts1(snapshot1.docs.map(doc => ({
              id1: doc.id,
              post1: doc.data(),
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
        <div>
           {currentUser &&(
          
          posts.map(({ id, post }) => (
              < Mentors1 key={id} postId={id} photoURL={post.photoURL} postUserId={post.uid}  followedFirstName={post.firstName} followedLastName={post.lastName} categoryFollowed={post.category} followedMember={post.post} year={post.year} />
          ))
      
          )} 
          {currentUser &&(
          
          posts1.map(({ id1, post1 }) => (
              < Mentors2 key={id1} postId={id1} photoURL={post1.photoURL} postUserId={post1.uid}  followedFirstName={post1.firstName} followedLastName={post1.lastName} categoryFollowed={post1.category} followedMember={post1.post} year={post1.year} />
          ))
      
          )} 
          
        </div>
    )
}

export default Posts
