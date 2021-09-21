import React, { useState, useEffect } from 'react';
import {auth} from './../../firebase';
import {db} from './../../firebase';
import './style.css'
import {Link} from 'react-router-dom';


function Post({postId, user, imageUrl,title, noLikes, postUserId, timestamp,caption}) {
    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('')
    const [messageCount, setMessageCount] = useState(0)


    const [postUser, setPostUser] = useState();
    const {currentUser} = auth

   
   useEffect(() => {
    let unsubscribe;
    if (postId) {
        unsubscribe = db.collection("comments").where("postId","==", postId).where("read","==", false).orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setMessageCount(snapshot.docs.length);
        });
    }
    return () => {
        unsubscribe();
    }
}, [postId]);

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPostUser(snapshot.data())
            })
        }

        console.log(postUserId)
    }, [postUserId])

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(user.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show == 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike')
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                    }
                }
            })
    }, [postId, user.uid]);

    const likeHandle = (event) => {
        event.preventDefault();
        if (show == 'like2') {
            setShow('like2 blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like2');
            setShow2('textforlike')
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show == 'like2') {
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(user.uid).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }
    return (
        <div className="videoCard">
                <>
            {/* <center><button style={{background: "orange", color: "white"}} >Add to cart</button></center> */}

            <Link to={`/postview/${postId}/${auth?.currentUser?.uid}/${postUserId}`}>
            
              {imageUrl &&(
                  <>
                              <center><h3 style={{color: "white",background: "#1E90FF"}}>{title}</h3></center>

                <div class="card">
        
                <img class="card-img-top navbar-brand " style={{objectFit: "cover"}}
                 src={imageUrl} alt="No image" />
                
              </div>
              </>
              )}
              {!imageUrl &&(
                  <>
           
            <center><h3 style={{color: "white",background: "#1E90FF"}}>{title}</h3></center>
            

                            <center><h4 style={{color: "#1E90FF"}}><i>{caption}</i></h4></center>
                            </>

              )}
                </Link>
                <center><p style={{color: "orange"}} >{}</p></center>
            <div className="post__likeandlove">
            <div className="details">
            <div className="details1" style={{color: "#1E90FF"}}>{noLikes} {noLikes == 1 ? "Likes" : "Likes"}</div> <div className="details2" style={{color: "#1E90FF"}}>{messageCount} Comments</div>

            </div>
            </div>

            <div class="hr1" />

            <div style={{background: " #e5e8e8 "}} className="post__likeoptions">
                <div  className="like" onClick={likeHandle}>
                    <i  className={show} />
                    <h3 className={show2}>Like</h3>
                </div>
                <div className="comment">
                    <Link to={`/postview/${postId}`}>
                    <i className="comment2" />
                    </Link>

                    <h3 class="dope" >Comment </h3>
                </div>
                
            </div>
            

            {
                
                comments.map((comment) => (
                    
                    <div  className={`comments__show ${comment.username == user?.displayName && 'myself'}`}>
                              
                                                

                        
                        {comment.username == user?.displayName && (
                           
                           <>
                       {/* <section>
                        <div className="dropdown">
                           <MoreHorizIcon   className="dropdown"/>
                           <div className="dropdown__content">
                               <hr/>
                               
                               
                               <a onClick={addTodo}><p>Delete</p></a>
                               <hr />
                           </div>
                        </div>
                    </section> */}
                           </>
                           
            )} 
                    </div>

                    
                ))
            }
            </>
       
                            
        </div>
    )
}
    


export default Post
