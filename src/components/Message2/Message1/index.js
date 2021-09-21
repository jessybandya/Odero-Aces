import React, {useState,useEffect} from 'react';
import {db} from '../../firebase'
import './style.css';
import {Avatar, Badge} from '@material-ui/core';


function Message1({fromId,fromLastName,fromFirstName,fromPhotURL,message,timestamp,toFirstName,toId,toLastName,toProfile,user,postId}){

	const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }



    return(
        <div  >
        <div   class="card-body height3">
        			<ul   class="chat-list">
						{fromId !== user?.uid  &&(
                        <li class="in">
																	<>

						<div class="chat-img">
							<img class="card-img-top navbar-brand user_img  rounded-circle" alt="Avtar" src={fromPhotURL} style={{objectFit: "cover"}}/>
						</div>
						<div class="chat-body">
							<div class="chat-message">
                                 <h5>{fromFirstName} {fromLastName}</h5>
								 <p>{message}</p>
								 <p>{parseTimestamp(timestamp)}</p>
							</div>
						</div>
						</>
						
					</li>
						)}
        				{fromId == user?.uid  &&(
                        <li class="out">
						<div class="chat-img">
							<img class="card-img-top navbar-brand user_img  rounded-circle" alt="Avtar" src={fromPhotURL} style={{objectFit: "cover"}}/>
						</div>
						<div  class="chat-body">
							<div  class="chat-message">
								<h5>Me</h5>
								<p>{message}</p>
								<p>{parseTimestamp(timestamp)}</p>
							</div>
						</div>
					</li>
						)}
        				
        				
        			</ul>
        		</div>
        </div>    
    )
}
export default Message1;