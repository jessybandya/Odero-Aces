import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'
import Postview from './components/Postview';
import Postview2 from './components/Postview2';
import Signup from './components/Signup'
import About from './components/About'
import Myprofile from './components/Profile'
import Profile1 from './components/Profile1'
import Profile2 from './components/Profile2'
import Myposts from './components/Myposts'
import Message from './components/Message'
import Addposts from './components/Addposts'
import Blogs from './components/Blogs'
import MentorsFirst2 from './components/MentorsFirst2'
import Headertest from './components/Headertest'
import Ment from './components/Ment'
import Header from './components/Header'
import Notify1 from './components/Notification'
import Notify2 from './components/Notification2'
import MessagePageMain from './components/MessagePageMain'
import DirectMessages from './components/DirectMessages'
import DirectMessages2 from './components/Message2'
import Mentors4 from './components/Message2'




import Tabs from './components/Tabs'


import Mentors1 from './components/MentorsFirst'

import test from './test'


import {auth} from './components/firebase'


import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
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
    <div  className="App">
      <Router>
        <Switch>
        <Route exact path="/">
              <Home  user={user}/>
            </Route>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/myposts" component={Myposts}/>
          <Route exact path="/test" component={test}/>
          <Route exact path="/addposts" component={Addposts}/>
          <Route exact path="/header" component={Headertest}/>
          <Route exact path="/tabs" component={Tabs}/>
          <Route exact path="/notify2" component={Notify2}/>


          
            <Route exact path="/messages/:id1/:uid">
           <Message user={user} />
          </Route> 

          
          <Route exact path="/">
           <Header user={user} selected/>
          </Route>
          <Route exact path="/notify1/:uid">
           <Notify1 user={user} />
          </Route>
          <Route exact path="/notify2/:uid">
           <Notify2 user={user} />
          </Route>

          <Route exact path="/about">
           <About user={user} />
          </Route>
          <Route exact path="/blogs">
           <Blogs user={user} />
          </Route>
          <Route exact path="/mentors">
           <Ment user={user} />
          </Route>


          <Route path="/postview/:id/:uid/:uid1"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Postview user={user}/>   
                 
           )}/> 
           <Route path="/postview2/:id1/:uid/:uid1"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Postview2 user={user}/>   
                 
           )}/> 
           <Route path="/myprofile/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Myprofile user={user}/>   
                 
           )}/> 
           <Route path="/profile5/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Profile1 user={user}/>   
                 
           )}/> 
           <Route path="/profile2/:uid"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <Profile2 user={user}/>   
                 
           )}/> 
           {/* <Route path="/messagepagemain"
            render={ () => !auth.currentUser ? <Redirect to="/login" /> :(
              <MessagePageMain user={user}/>   
                 
           )}/>     */}
{/* <Route exact path="/messagepagemain">
           <MessagePageMain user={user} />
          </Route> */}
          <Route exact path="/directmessages/:uid">
           <MessagePageMain user={user} />
          </Route>
          <Route exact path="/directmessages2/:uid">
           <Mentors4 user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
