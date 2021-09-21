import React, {useEffect, useState} from 'react'
import './style.css';
import {auth} from '../../firebase'
import {db} from '../../firebase'

import {Avatar, Badge} from '@material-ui/core';
import {Link} from 'react-router-dom'


function DirectMessages1({user,fromId,postId,fromPhotoURL,fromFirstName,fromLastName,toId,read,message,timestamp,myId}) {
    
    const [profileUserData, setProfileUserData] = useState();

	useEffect(() => {
        db.collection('users').doc(fromId).onSnapshot((doc) => {
            setProfileUserData(doc.data());
        });
    }, [])


    return (
		profileUserData ?(
        <div>
      	<div class="card-body contacts_body">
			  
               <ul class="contacts">
			   <Link to={`/messages/${fromId}/${myId}`}>
		   <div>
			   <div class="d-flex bd-highlight">
				   <Badge badgeContent={4} color="error">
				   <div class="img_cont">
					   <img class=" user_img  rounded-circle" src={fromPhotoURL} style={{objectFit: "cover"}}/>
					   <span class="online_icon "></span>
				   </div>
				   </Badge>
				   <div class="user_info">
					   <span>{profileUserData.firstName} {profileUserData.lastName}</span>
					   <p> left 7 mins ago</p>
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
</div>


):(
	<h1>loading...</h1>
)    
        

    )
}

export default DirectMessages1
