import React, {useState, useEffect} from 'react';
import Header from '../Header'
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {db} from '../firebase';
import {auth} from '../firebase';
import Button from '@material-ui/core/Button';
import {useParams, Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  
  

function Profile() {
    const [user, setUser] = useState([]);
    const {currentUser} = auth
    const [posts1, setPosts1] = useState([]);
    const [posts, setPosts] = useState([]);
    const [followersCount, setFollowers]= useState(0);
    const [followingCount, setFollowing]= useState(0);

    useEffect(() => {
        db.collection('follows').where('idFollowed', '==', uid).where('toId', '==', auth.currentUser.uid).where("read", "==", false)
       .onSnapshot(snapshot => (
        setPosts(snapshot.docs.length)
       ))
    }, []);
    
 
    //   useEffect(() => {
    //     //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
    //     //       console.log(snapshot)
    //     //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
    //     //   }).catch(error => {
    //     //       console.error(error)
    //     //   })
    //       const unsub = db.collection('followsNotify').where('idFollowed', '==', user?.uid).where("read", "==", false).onSnapshot(snapshot => {
    //           console.log(snapshot)
    //           let messages = []
    //           snapshot.forEach(doc => {
    //               messages.push({id:doc.id, data:doc.data()})
    //               doc.ref.update({read:true})
    //           })
    //           setPosts1(messages)
    //       }, error => console.error(error))
    //       return () => {
    //           unsub()
    //       }
          
    //   }, []);

    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    }) 

    const [profileUserData, setProfileUserData] = useState();


    const { username, uid } = useParams();
    
    document.title = `${username}`

    const myAccount = username === user.displayName;


    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])

    if (profileUserData !== undefined) {
        if (profileUserData?.displayName !== user?.displayName) {
           

        } else {
        }
    }
    const classes = useStyles();

    useEffect(() => {
        db.collection('follows').where("toId", "==", uid).where("read","==", false)
       .onSnapshot(snapshot => (
        setFollowing(snapshot.docs.length)
       ))
   }, []);
   useEffect(() => {
    db.collection('follows').where("idFollowed", "==", uid).where("read","==", false)
   .onSnapshot(snapshot => (
    setFollowers(snapshot.docs.length)
   ))
}, []);

    const requestInvoice = () => {
        db.collection('follows').where("idFollowed", "==", profileUserData.uid).where("toId","==", auth.currentUser.uid).get().then(
          snap => {
            if (snap.docs.length > 0) {
              alert(`Already following ${profileUserData.firstName} ${profileUserData.lastName}`)
            } else {
                db.collection('follows').add({
                    //
                  timestamp:  Date.now(),
                  profilePic: auth.currentUser.photoURL,
                  adminId: auth.currentUser.uid,
                  email:auth.currentUser.email,
                  userName:auth.currentUser.displayName,
                  firstNameFollowed: profileUserData.firstName,
                  middleNameFollowed: profileUserData.middleName,
                  lastNameFollowed: profileUserData.lastName,
                  idFollowed: profileUserData.uid,
                  photoFollowed: profileUserData.photoURL,
                  categoryFollowed: profileUserData.category,
                      read: false,
                      followedMember:profileUserData.post,
                      toId: auth.currentUser.uid,
          
                      
          
                }).then(ref => alert(`Started following ${profileUserData.firstName} ${profileUserData.firstName}`))
            }
          }
        )
      }
      useEffect(() => {
        //   db.collection('messages').where('chat', '==', post).orderBy('timestamp', 'asc').get().then(snapshot => {
        //       console.log(snapshot)
        //       setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() })))
        //   }).catch(error => {
        //       console.error(error)
        //   })
        const unsub=  db.collection('follows').where('idFollowed', '==', `${auth?.currentUser?.uid}`).where("read1", "==", false).where("toId","==", uid).onSnapshot(snapshot => {
              console.log(snapshot)
              let messages = []
              snapshot.forEach(doc => {
                  messages.push({id:doc.id, data:doc.data()})
                  doc.ref.update({read1:true})
              })
              setPosts1(messages)
          }, error => console.error(error))
          return function cleanup () {
              unsub()
          }
  
      }, []);
      
    return (
        profileUserData ?(
        <>
        <Header />
        <div id="navbar2" class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img class="card-img-top navbar-brand " src={profileUserData?.photoURL} alt=""/>
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {profileUserData.firstName} {profileUserData.lastName}
                                    </h5>
                                    <h6>
                                       ACES_UoN POST: {profileUserData.post}
                                    </h6>
                                    <div style={{display: "flex",justifyContent: "space-between"}}>
                                    <p class="proile-rating" style={{display: "flex"}}><b><h6>Followers</h6></b>    <span style={{marginLeft: "10px"}}>{followersCount}</span></p>
                                    
                                    <p class="proile-rating" style={{display: "flex"}}><b><h6>Following</h6></b>    <span style={{marginLeft: "10px"}}>{followingCount}</span></p>
                                    </div>


                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Summury</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">More</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2" style={{display: "flex"}}>
                        {/* <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/> */}
                        <Button variant="" style={{height: "50px",width: "200px"}} onClick={requestInvoice} size="small" color="primary" className={classes.margin}>
                            {uid == auth.currentUser.uid &&(
                                <>
                                {posts ?(
                                    <>
                                <b style={{color: "#1E90FF"}}></b>
                                </>
                                ):(
                                  <b style={{color: "#1E90FF"}}></b>
                                )}
                               
                                </>
                            )}
                            {!(uid == auth.currentUser.uid) &&(
                                 <>
                                 {posts ?(
                                     <div style={{marginRight: "50px",display: "flex"}}>
                                 <b style={{color: "white",border: "2px #1E90FF solid",background: "#1E90FF",borderRadius: "15px"}}>Following</b>
                                 
                                 </div>
                                 ):(
                                   <b style={{color: "#1E90FF",border: "2px #1E90FF solid"}}>Follow</b>
                                 )}
                                
                                 </>
                                )}
          
          
        </Button>
        {!(uid == auth.currentUser.uid) &&(
                                 <>
                                 {posts ?(
                                     <div style={{marginRight: "",display: ""}}>
                                 <Link to={`/messages/${uid}/${auth.currentUser.uid}`}>
                                 <button style={{color: "white",border: "2px #1E90FF solid",background: "#1E90FF",borderRadius: "15px",marginTop: "20px"}}>Message</button>
                                 </Link>
                                 </div>
                                 ):(
                                   <b></b>
                                 )}
                                
                                 </>
                                )}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p></p>
                            <a href=""></a><br/>
                            <a href=""></a><br/>
                            <a href=""> </a>
                            <p></p>
                            <a href=""></a><br/>
                            <a href=""></a><br/>
                            <a href=""></a><br/>
                            <a href=""></a><br/>
                            <a href=""></a><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" style={{background: "white"}} id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>First Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.firstName}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Last Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.lastName}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Username</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.firstName} {profileUserData.lastName}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Gender</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.gender}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Registration Number</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.reg}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Other Profession(s)</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.others}</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="tab-pane fade" id="profile" style={{background: "white"}} role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Year of Study</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.year}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>YOB</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{`${profileUserData?.birthday[0]} - ${profileUserData?.birthday[1]} - ${profileUserData?.birthday[2]}`}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Category</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{profileUserData.category}</p>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        </>
        ):(
            <h1>loading...</h1>
        )
    )
}

export default Profile
