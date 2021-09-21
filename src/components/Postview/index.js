import React, {useState, useEffect} from 'react';
import './style.css';
import {useParams, Link} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { storage, db } from './../firebase';
import firebase from "firebase";
import Dialog from '@material-ui/core/Dialog';
import FormSelect from './../forms/FormSelect';
import FormInput from './../forms/Forminput';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Header from './../Header';

function Postview({ postUserId, timestamp, user, description}) {

    let { id } = useParams();
    let { uid } = useParams();
    let { username } = useParams();

    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }


    const [post, setPost] = useState(null)
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [comments, setComments] = useState([]);
    const [postUser, setPostUser] = useState();
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState('paper');
    const [input, setInput] = useState("");
    const [price, setPrice] = useState("");
    const [cat, setCat] = useState("");
    const [name1, setName1] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");




    useEffect(() => {
        db.collection('users').doc(user?.uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
      }, [])
 



 



    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [profileUserData, setProfileUserData] = useState();

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])
    

   
    


    useEffect(() => {
        db.collection('posts').doc(id).get().then(
            snapshot => setPost(snapshot.data())
        ).catch(
        )
        
     
    }, []);
   

    useEffect(() => {
        
             db.collection("comments").where("postId","==", id).orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        
       
    }, []);
    

    useEffect(() => {
        db.collection("posts")
            .doc(id)
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
    }, [id, user.uid]);

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
            .doc(id)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show == 'like2') {
                    db.collection("posts")
                        .doc(id)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(id).collection("likes").add({
                                    likes: 1,
                                    read1: false,
                                    read: false,
                                    fromId:profileUserData?.uid,
            fromFirstName: profileUserData?.firstName,
            fromLastName: profileUserData?.lastName,
            timestamp: Date.now(),
            photoURL: profileUserData?.photoURL,
            postId:id,
                                });
                                db.collection('posts').doc(id).update({
                                    noLikes: data.noLikes + 1,
                                    read1: false,
                                    read: false,
                                    fromId:profileUserData?.uid,
            fromFirstName: profileUserData?.firstName,
            fromLastName: profileUserData?.lastName,
            timestamp: Date.now(),
            photoURL: profileUserData?.photoURL,
            postId:id,
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(id).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(id).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }
    const postComment = (event) => {
        event.preventDefault();

        db.collection("comments").add({
            text: comment,
            read: false,
            read1: false, 
           fromId:profileUserData?.uid,
            fromFirstName: profileUserData?.firstName,
            fromLastName: profileUserData?.lastName,
            timestamp: Date.now(),
            photoURL: profileUserData?.photoURL,
            postId:id,
            postUserId:post.uid,
        });
        setComment('');
    }

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.data().photoURL)
                console.log(snapshot.data())
            })
        }
    }, [])


    

   


  
      
      


    return (
        post ?(
        <>
        <Header user={user}/>
        <div style={{marginTop: "50px"}} className="home">
                
          <div className="post">
          <Link to={`/profile5/${post.uid}`}>
            <div className="post__header">
            <div  class="chat-img" style={{width: "60px"}}>
							<img class="card-img-top navbar-brand user_img  rounded-circle" alt="Avtar" src={post.photoURL} style={{objectFit: "cover"}}/>
						</div>   
                                <h3 onClick={() => {
                    
                }} style={{cursor: 'pointer',color: "#1E90FF"}}> <Link to={`/profile5/${post.uid}`}>{post.username}</Link>
                </h3>


                <i class="post__verified" />
            </div>
            </Link>
                <h3  onClick={() => {
                    window.location.href=  `/${caption}/${user?.uid}`
                }} style={{cursor: 'pointer',marginLeft: "50px",color: "#1E90FF"}} ><b></b><p style={{marginLeft: "0px"}}>{post.title}</p></h3>
                
            <h4 style={{color: "blue"}} className="post__text">Time posted: {parseTimestamp(post.timestamp)}</h4>
            
            <div class="hr" />
            {/* <center> <Link to={`/profile/${post.uid}`}><Button variant="contained" color="primary">View Owner Profile</Button></Link></center> */}

             {!(post.imageUrl) &&(
                 <center>
                 <h3  onClick={() => {
                         window.location.href=  `/${caption}/${user?.uid}`
                     }} style={{cursor: 'pointer',marginLeft: "50px",color: "#1E90FF"}} ><p style={{marginTop: "30px",maxWidth: "100%"}}>{post.caption}</p></h3>
                 </center>
             )}
              {(post.imageUrl) &&(
                 <center><img class="card-img-top navbar-brand post__image" src={post.imageUrl}  />
                 <h3  onClick={() => {
                         window.location.href=  `/${caption}/${user?.uid}`
                     }} style={{cursor: 'pointer',marginLeft: "50px",color: "#1E90FF"}} ><p style={{marginTop: "30px",maxWidth: "100%"}}>{post.caption}</p></h3>
                 </center>
             )}
            
           
           

            <div class="hr" />
            

            <div className="post__likeoptions" style={{background: "#1E90FF"}}>
                <div className="like" onClick={likeHandle}>
                    <i className={show} />
                    <h3 style={{color: "white"}} className={show2}>Like</h3>
                </div>
                <div className="comment">
                    <i className="comment2" />
                    <h3 style={{color: "white"}} class="dope">Comment</h3>
                </div>
                
            </div>
            <form onSubmit={postComment}>
                <div className="" style={{display: "flex"}}>
                <div  class="chat-img" style={{width: "60px"}}>
							<img class="card-img-top navbar-brand user_img1  rounded-circle" alt="Avtar" src={profileUserData?.photoURL} style={{objectFit: "cover"}}/>
						</div>  
                    <input className="commentInputBox" type="text" placeholder="Write a comment ... " value={comment} onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>

            {
                
                comments.map((comment) => (
                    
                    <div  className={`comments__show ${comment.username == postUser?.displayName && 'myself'}`}>
                              
                                                

                              <div  class="chat-img" style={{width: "60px"}}>
                              <Link to={`/profile5/${comment.fromId}`}>
							<img class="card-img-top navbar-brand user_img1  rounded-circle" alt="Avtar" src={comment?.photoURL} style={{objectFit: "cover"}}/>
                            </Link>
						</div>
                         
                        
                        <div  class="container__comments">
                            <p > <Link to={`/profile5/${comment.fromId}`}><span>{comment.fromFirstName} {comment.fromLastName}</span></Link><i class="post__verified"></i>&nbsp;<p>{comment.text}</p></p>

                        </div>
                        {comment.username == user?.displayName && (
                           
                           <>
                       <section>
                        <div className="dropdown">
                           {/* <MoreHorizIcon   className="dropdown"/> */}
                           
                        </div>
                    </section>
                           </>
                           
            )} 
                    </div>

                    
                ))
            }
        </div>
         </div>
        </>
        ): (<h1>loading...</h1>)
    )
}

export default Postview
