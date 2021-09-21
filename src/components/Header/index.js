import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Avatar, Badge} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import {auth,db} from './../firebase';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {useParams} from 'react-router-dom'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import './style.css'


function Header({user, selected}) {
  const history = useHistory("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // const [user, setUser] = useState([]);
  const {currentUser} = auth
  const [profileDown, setProfileDown] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followingCount, setFollowing]= useState(0);
  const [following, setFollowing1]= useState('');
  const [messageCount, setMessageCount]= useState(0);
  const [profileUserData, setProfileUserData] = useState();
  const [comment, setComment] = useState(0);


  useEffect(() => {
       db.collection('messages').where("toId", "==" ,`${auth?.currentUser?.uid}`).where("read1", "==",false).orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
          setMessageCount(snapshot.docs.length)
      }
      )
  }, []);



  const collapseNavbar = () => {
    document.getElementsByClassName('dropdown-content2')[0].style.display = 'none';
  }

  // auth.onAuthStateChanged((authUser) =>{
  //   if(authUser){
  //     setUser(authUser)
  //   }else{
  //     setUser(false);
  //   }
  // })
 


  const {  uid } = useParams();






useEffect(() => {
  db.collection('users').doc(auth?.currentUser?.uid).onSnapshot((doc) => {
      setProfileUserData(doc.data());
  });
}, [])

 
  const logout = () => {
    if (user) {
      auth.signOut();
      history.push("/login");
    }
  }


useEffect(() => {
  db.collection('users').onSnapshot((snapshot) => {
    setPosts(snapshot.docs.map((doc) => doc.data()))
  })

  if (posts !== undefined) {
    const finalUsers = posts.filter(user => {
      return user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    })

    setFilteredUsers(finalUsers)
  }
}, [searchTerm])


useEffect(() => {
  db.collection('follows').where("idFollowed", "==", `${auth?.currentUser?.uid}`).where("read1", "==", false)
 .onSnapshot(snapshot => (
  setFollowing(snapshot.docs.length)
 ))
}, []);



const updateSearchResults = (e) => {
  setSearchTerm(e.target.value)
  document.getElementsByClassName('dropdown-content3')[0].style.display = 'block';
}
useEffect(() => {
  db.collection('comments').where("fromId", "!=", `${auth?.currentUser?.uid}`).where("postUserId", "==", `${auth?.currentUser?.uid}`).where("read1", "==", false)
 .onSnapshot(snapshot => (
  setComment(snapshot.docs.length)
 ))
}, []);




    return (
      <>
       {currentUser &&(

            <nav id="navbar" style={{background: "#1E90FF"}} class="navbar navbar-expand-lg navbar-light ">
              <Link to="/">
  <a class="navbar-brand" style={{color: "white"}} href="#">ACES_UoN</a>
  </Link>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <Badge badgeContent={messageCount + comment + followingCount} color="error">
    <span class="navbar-toggler-icon"></span>
    </Badge>

  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">

    
    <ul class="navbar-nav mr-auto">
    {selected &&(
      <li class="nav-item active">
      <Link to="/">
        
        <a class="nav-link" style={{color: "white"}} href="#">Home <span class="sr-only">(current)</span></a>
        </Link>
      </li>
      )}
      {!selected &&(
      <li class="nav-item ">
      <Link to="/">
        
        <a class="nav-link" style={{color: "white"}} href="#">Home <span class="sr-only">(current)</span></a>
        </Link>
      </li>
      )}
      
      {/* <li class="nav-item">
      <Link to="/login">
        <a style={{color: "white"}} class="nav-link" href="#">Login</a>
        </Link>
      </li>
      <li class="nav-item">
      <Link to="/signup">
        <a style={{color: "white"}} class="nav-link" href="#">Sign Up</a>
        </Link>
      </li> */}
      <li class="nav-item">
      <Link to="/blogs">
        <a style={{color: "white"}} class="nav-link" href="#">Site Blogs</a>
        </Link>
      </li>
      <li class="nav-item">
      <Link to="/about">
        <a style={{color: "white"}} class="nav-link" href="#">About</a>
        </Link>
      </li>
      <li class="nav-item dropdown">
        <a style={{color: "white"}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {/* {user?.displayName} */}
          {profileUserData?.firstName} {profileUserData?.lastName}
         
        </a>
        <div class="dropdown-menu" style={{zIndex: "1",marginTop: "50px"}} aria-labelledby="navbarDropdown">
          <Link to={`/myprofile/${profileUserData?.uid}`}>
          <a class="dropdown-item" href="#" style={{display: "flex",justifyContent: "center"}}><Avatar   alt="Remy Sharp" src={`${profileUserData?.photoURL}`} /> <div style={{marginTop: "10px",marginLeft: "10px"}}>My Profile</div> </a>
          </Link>
          <Link  to="/myposts">
          <a class="dropdown-item" href="#" style={{display: "flex",justifyContent: "center"}}><MarkunreadMailboxIcon style={{color: "#1E90FF",marginLeft: "-10px"}}/><div style={{marginLeft: "10px"}}>My Posts</div></a>
          </Link>
          <div class="dropdown-divider"></div>
          <a onClick={logout} class="dropdown-item" href="#"><ExitToAppIcon style={{color: "#1E90FF"}} onClick={logout}/> Logout</a>
        </div>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li> */}
    </ul>
    <form class="form-inline my-2 my-lg-0">
    <Badge style={{marginRight: "10px"}} badgeContent={0} color="error" >
      <Link to="/mentors">
      <SupervisedUserCircleIcon  style={{marginRight: "",color: "white"}}/>
      </Link>
      </Badge>
    <Badge style={{marginRight: "10px"}} badgeContent={0} color="error" >
      <SupervisorAccountIcon  style={{marginRight: "",color: "white"}}/>
      </Badge>
      <p></p>

      <Badge  style={{marginRight: "10px"}} badgeContent={followingCount} color="error" >
        <Link to={`/notify1/${profileUserData?.uid}`} >
      <AnnouncementIcon    style={{marginRight: "",color: "white"}}/>
      </Link>
      </Badge>
    <Badge style={{marginRight: "10px"}} badgeContent={comment} color="error" >
    <Link to={`/notify2/${profileUserData?.uid}`} >
      <NotificationsIcon  style={{marginRight: "",color: "white"}}/>
      </Link>

      </Badge>
      <Badge style={{marginRight: "10px"}} badgeContent={messageCount}  color="error" >
        <Link to={`/directmessages/${profileUserData?.uid}`}>
      <MessageIcon  style={{marginRight: "0px",color: "white"}}/>
      </Link>
      </Badge>
      <input onChange={updateSearchResults}  className="searchBox" class="form-control mr-sm-2" type="search" placeholder="Search person.." aria-label="Search"/>
      {/* <SearchIcon style={{color: "white",cursor: "pointer"}}/> */}
      <div class="dropdown-content3">
          <ul id="list">
            {
              posts !== undefined && (
                filteredUsers.map((user1) => (
                  <div>
                    <Link  to={`/profile/${user1.uid}`}>
                      <div style={{display: "flex",alignItems: "center",justifyContent: "space-between"}}>
                      <Avatar className="searchAvatar" src={user1.photoURL} />
                      <h3 className="searchH3">{user1.firstName} {user1.lastName}</h3>
                      </div>
                      
                    </Link>
                  </div>
                ))
              )
            }
          </ul>
        </div>
    </form>
  </div>
</nav>
)}
{!currentUser &&(

<nav id="navbar" style={{background: "#1E90FF"}} class="navbar navbar-expand-lg navbar-light ">
<Link to="/">
<a class="navbar-brand" style={{color: "white"}} href="#">ACES_UoN</a>
</Link>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav mr-auto">
<li class="nav-item active">
<Link to="/">
<a class="nav-link" style={{color: "white"}} href="#">Home <span class="sr-only">(current)</span></a>
</Link>
</li>
<li class="nav-item">
<Link to="/login">
<a style={{color: "white"}} class="nav-link" href="#">Login</a>
</Link>
</li>
<li class="nav-item">
<Link to="/signup">
<a style={{color: "white"}} class="nav-link" href="#">Sign Up</a>
</Link>
</li>
<li class="nav-item">
<Link to="/about">
<a style={{color: "white"}} class="nav-link" href="#">About</a>
</Link>
</li>
{/* <li class="nav-item dropdown">
<a style={{color: "white"}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Me
</a>
<div class="dropdown-menu" aria-labelledby="navbarDropdown">
<a class="dropdown-item" href="#" style={{display: "flex",justifyContent: "center"}}><Avatar  alt="Remy Sharp" src="" /> <div style={{marginTop: "10px",marginLeft: "10px"}}>My Profile</div> </a>
<a class="dropdown-item" href="#" style={{display: "flex",justifyContent: "center"}}><MarkunreadMailboxIcon style={{color: "#1E90FF",marginLeft: "-10px"}}/><div style={{marginLeft: "10px"}}>My Posts</div></a>
<div class="dropdown-divider"></div>
<a class="dropdown-item" href="#"><ExitToAppIcon style={{color: "#1E90FF"}}/> Logout</a>
</div>
</li> */}
{/* <li class="nav-item">
<a class="nav-link disabled" href="#">Disabled</a>
</li> */}
</ul>
{/* <form class="form-inline my-2 my-lg-0">
<Badge style={{marginRight: "10px"}} badgeContent={2} color="error" >
<NotificationsIcon  style={{marginRight: "",color: "white"}}/>
</Badge>
<Badge style={{marginRight: "10px"}} badgeContent={5} color="error" >
<MessageIcon style={{marginRight: "0px",color: "white"}}/>
</Badge>
<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
<SearchIcon style={{color: "white",cursor: "pointer"}}/>
</form> */}
</div>
</nav>
)}
  </>     
    )
}

export default Header
