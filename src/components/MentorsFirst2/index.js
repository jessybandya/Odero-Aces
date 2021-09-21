import React, {useEffect, useState} from 'react';
import './style.css'
import Mentors1 from './Mentors1';

import {auth} from '../firebase'
import {db} from '../firebase'
import Header from './../Header'
import { useHistory } from 'react-router-dom';



function Posts() {

    const history = useHistory("");
    const [posts, setPosts] = useState([]);
    const [posts1, setPosts1] = useState([]);

   const {currentUser} = auth
    // document.title = 'Facebook';

   

    useEffect(() => {
        db.collection('messages1').where("read1","==", true).onSnapshot(snapshot => {
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
        <div>
          <div style={{marginTop: "0px"}}>
            < Mentors1  />
          </div>
        </div>
    )
}

export default Posts
