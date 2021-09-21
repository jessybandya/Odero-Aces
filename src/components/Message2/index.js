import React, {useState, useEffect} from 'react'
import './style.css'
import Header from './../Header';
import {useParams,Link} from 'react-router-dom'
import {auth} from './../firebase';
import {db} from './../firebase';
import Message1 from './Message1'
import {Avatar, Badge} from '@material-ui/core';


function Message({user}) {
  const [post, setPost] = useState(null)
  const [toUser, setToUser] = useState(null)
  const [posts, setPosts]= useState([]);
  const [posts1, setPosts1]= useState([]);
  const [fromUser, setFromUser]= useState([]);
  const [profileUserData, setProfileUserData] = useState();


  const [ text , setText] = useState("");

  let { id1 } = useParams();
  let { uid } = useParams();


  useEffect(() => {
    db.collection('chats1').where(`users.${user?.uid}`, '==', true).get().then(
        snapshot => {
            if (snapshot.docs.length >= 1) {
                setPost(snapshot.docs[0].id)
            } else {
                db.collection('chats').add({users:{[auth.currentUser.uid]:true}}).then(ref => setPost(ref.id))
                console.log(snapshot.docs)
            }
        }
    )
    db.collection('users').doc(id1).get().then(
        doc => {
            setToUser({id:doc.id, data:doc.data()})
        }
    )
    db.collection('users').doc(user?.uid).get().then(
      doc => {
        setFromUser({id:doc.id, data:doc.data()})
      }
  )
    
  

}, []);




useEffect(() => {
  db.collection('users').doc(uid).onSnapshot((doc) => {
      setProfileUserData(doc.data());
  });
}, [])
const addTodo = (event) => {
  event.preventDefault();

db.collection('messages1').add({
    //
  message: text,
  timestamp:  Date.now(),
  // toFirstName: toUser.data.firstName,
  // toLastName: toUser.data.lastName,
  // toMiddleName: toUser.data.middleName,
  // toEmail: toUser.data.email,
  // toProfile: toUser.data.photoURL,
  chat: post,
  read: false,
  read1:false,
  // toId: toUser.id,
  fromPhotoURL: profileUserData?.photoURL,
  fromId: profileUserData?.uid,
  fromEmail:profileUserData?.email,
  fromFirstName:profileUserData?.firstName,
  fromLastName:profileUserData?.lastName,
  fromMiddleName:profileUserData?.middleName,
  
})
  setText("");

};





useEffect(() => {
    //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
    //       console.log(snapshot)
    //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
    //   }).catch(error => {
    //       console.error(error)
    //   })
      const unsub = db.collection('messages1').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
          console.log(snapshot)
          let messages = []
          snapshot.forEach(doc => {
              messages.push({id:doc.id, data:doc.data()})
              if (doc.data().fromId !== user?.uid) {
                  doc.ref.update({read1:true})
              }
          })
          setPosts1(messages)
      }, error => console.error(error))
      return function cleanup () {
          unsub()
      }
  }, [post, text]);


    return (
     
        <>
        <Header user={user}/>
        

        <div  className="message">

            <div style={{overflowY: "scroll"}}   class="chat_window">

    <div    class="top_menu">
        
        {posts1.map((post) => {
                             return (
                                <div >
                                    <Message1
                                    message={post.data.message}
                                    //   displayName={post.data.displayName}
                                    fromId={post.data.fromId}
                                    fromFirstName={post.data.fromFirstName}
                                    fromLastName={post.data.fromLastName}
                                    user={user}
                                    timestamp={post.data.timestamp}
                                    fromPhotURL={post.data.fromPhotoURL}
                                    toFirstName={post.data.toFirstName}
                                    toLastName={post.data.toLastName}
                                    toId={post.data.toId}
                                    toProfile={post.data.toProfile}
                                    //   price={post.data.price}
                                    //   image={post.data.image}
                                    //   category={post.data.category}
                                    //   id={post.id}
                                    /> 
                                  </div>
                                )
                         
                         return (

                            <Message1
                              message={post.data.message}
                            //   displayName={post.data.displayName}
                            fromId={post.data.fromId}
                            fromFirstName={post.data.fromFirstName}
                            fromLastName={post.data.fromLastName}
                            user={user}
                            timestamp={post.data.timestamp}
                            fromPhotURL={post.data.fromPhotoURL}
                            toFirstName={post.data.toFirstName}
                            toLastName={post.data.toLastName}
                            toId={post.data.toId}
                            toProfile={post.data.toProfile}
                            //   price={post.data.price}
                            //   image={post.data.image}
                            //   category={post.data.category}
                            //   id={post.id}
                             /> 
                              
                            )
            } )} 
    </div>
    

    {/* <Message1 /> */}
    
</div>
<div class="bottom_wrapper clearfix input__me">
      
        <div class="message_input_wrapper">

            <input type="text" value={text} class="message_input" placeholder="Type your message here..." onChange={(e) => setText(e.target.value)} />
        </div>
        <div style={{background: "#1E90FF"}} class="send_message">
            <div class="icon"></div>
            <div disabled={!text} type="submit" onClick={addTodo} class="text">Send</div>
        </div>
    </div>
        </div>
        </>
    )
}

export default Message
