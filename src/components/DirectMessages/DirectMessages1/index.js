import React, {useEffect, useState} from 'react'
import './style.css';
import {auth} from './../../firebase'
import {db} from './../../firebase'

import {Avatar, Badge} from '@material-ui/core';
import {Link} from 'react-router-dom'
import DirectMessages2 from './../DirectMessages2'


function DirectMessages1({user,fromId,postId,fromPhotoURL,fromFirstName,fromLastName,toId,read,message,timestamp,myId}) {
    
	const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }


    const [profileUserData, setProfileUserData] = useState();

	useEffect(() => {
		db.collection('users1').where("read","==", false).where("toId", "==", `${auth?.currentUser?.uid}`).orderBy("timestamp", "desc")
		.onSnapshot(snapshot => {
            setProfileUserData(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })
            )
            );
        })
   }, []);


	const [messageCount, setMessageCount]= useState(0);
    useEffect(() => {
         db.collection('messages').where("toId", "==" ,user?.uid).where("read1", "==",false).where("fromId", "==", fromId).orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
            setMessageCount(snapshot.docs.length)
        }
        )
    }, []);


    return (
		profileUserData ?(
        <div>
			{profileUserData &&(
              <div class="card-body contacts_body">
			  
			  <ul class="contacts">
			  <Link to={`/messages/${fromId}/${myId}`}>
		  <div>
			  <div class="d-flex bd-highlight">
				  <Badge badgeContent={messageCount} color="error">
				  <div class="img_cont">
					  <img class=" user_img  rounded-circle" src={fromPhotoURL} style={{objectFit: "cover"}}/>
					  <span class="online_icon "></span>
				  </div>
				  </Badge>
				  <div class="user_info">
					  <span>{fromFirstName} {fromLastName}</span>
					  <p>{parseTimestamp(timestamp)}</p>
				  </div>
			  </div>
		  </div>
		  </Link>
		  {/* <li>
			  <div class="d-flex bd-highlight">
			  <Badge badgeContent={3} color="error">
				  <div class="img_cont">
					  <img class="card-img-top navbar-brand user_img rounded-circle" src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" style={{objectFit: "cover"}}/>
					  <span class="online_icon offline"></span>
				  </div>
				  </Badge>
				  <div class="user_info">
					  <span>Taherah Big</span>
					  <p>Taherah left 7 mins ago</p>
				  </div>
			  </div>
		  </li> */}
		  
		  
		  
		  </ul>
			 
					   
				   </div>
			)}
			{!profileUserData &&(
				<h1 style={{marginTop: "00px",color: "black"}}>Empty set</h1>
			)}
      	
</div>


):(
	<h1>loading...</h1>
)    
        

    )
}

export default DirectMessages1
