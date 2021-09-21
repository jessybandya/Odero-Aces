import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { storage, db, auth } from './../firebase';
import firebase from "firebase";
import './style.css';
import FormSelect from './../forms/FormSelect';
import FormInput from './../forms/Forminput';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import Header from './../Header'
import { Button } from '@material-ui/core';
import './style.css'


function Myposts() {

    const user = firebase.auth().currentUser;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [caption, setCaption] = useState('');
    const [title, setInput] = useState('');
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState('paper');
  

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const uploadFileWithClick = () => {
        document.getElementsByClassName('four')[0].click();
    }

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        setImage("");
        setImageURL("");
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleUpload = (event) => {
        if (document.getElementsByClassName('hidden')[0]) {
            document.getElementsByClassName('hidden')[0].classList.remove('hidden');
        }
        document.getElementsByClassName('postButton').disabled = true;
        document.getElementsByClassName('postButton')[0].classList.add('disabled');

        if (caption == "" && imageURL == "") {
            console.log("Prevented Access to Photo or Caption Submission")
        } else {
            event.preventDefault();
            if (imageURL == '') {
                db.collection("posts").add({
                    timestamp: Date.now(),
                    caption: caption,
                    title: title,
                    imageUrl: "",
                    read: true,
                    noLikes: noLikes,
                    username: user?.displayName,
                    uid: user?.uid,
                    photoURL:user?.photoURL
                });
                handleClose();
                setProgress(0);
                setCaption("");
                setInput("");
                
                
                setImage(null);
            } else {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                db.collection("posts").add({
                                    timestamp: Date.now(),
                                    caption: caption,
                                    title: title,
                                    imageUrl: url,
                                    noLikes: noLikes,
                                    username: user?.displayName,
                                    uid: user?.uid,
                                    photoURL:user?.photoURL,
        
                                         read: true,
                                });
                                handleClose();
                                setProgress(0);
                                setCaption("");
                                setInput("");
                                

                                setImage(null);
                            })
                    }
                )
            }
        }

    }
    return (
        <>
        <Header />
        <div id="navbar3">
            <div>
            <Button style={{cursor: "pointer"}} value={caption} onClick={handleClickOpen('body')} placeholder={`Click here to post a product`} variant="contained" color="primary">Add Posts</Button>
            </div>
            <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <center><h4 style={{color: "#1E90FF"}}>Add Post</h4></center>
                        <CancelIcon style={{color: "#1E90FF"}} class="closeModalIcon" onClick={handleClose} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={user?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        
                        <input onChange={handleChange} type="file" accept="image/*" className='four' />
                        {/* <FormSelect
              label="Category"
              
              options={[{
                value: "",
                name: ""
              },
              {
                value: "solid",
                name: "Solid"
              }, {
                value: "liquid",
                name: "Liquid"
              }]}              onChange={(e) => setCat(e.target.value)} type="text" 
            />

            <FormInput
              label="Name"
              value={input}
            onChange={(e) => setInput(e.target.value)} type="text"  
            /> */}

            
{/* 
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={[price]}
            onChange={(e) => setPrice(e.target.value)} 
            />
  <FormInput
              label="Quantity in kgs"
              value={size}
            onChange={(e) => setSize(e.target.value)} type="text"  
            /> */}
                    
                    <FormInput
              label="Title"
              value={title}
            onChange={(e) => setInput(e.target.value)} type="text"  
            /> 
                    
                        <FormInput style={{height: "100px",width: "200px"}}
              label="Description"
              value={caption}
            onChange={(e) => setCaption(e.target.value)} type="text"  
            />
            </div>
                    <div class={`previewImage ${!image && "vanish"}`}>
                        <img src={imageURL} className="previewImaage" />
                    </div>
                    <div class="right">
            <div className="">
                        <div class="">
                            <center><Button onClick={uploadFileWithClick}  variant="contained" color="primary">Select an image</Button></center>
                            
                        </div>
                        
                        
                            
                           
                        </div>
                    </div>
                   

                    <progress value={progress} className="hidden" max="100" />

                    
                    <Button onClick={handleUpload} type="submit" variant="contained" color="primary" class={`postButton ${caption.length < 1 && "disabled"}`}>Post</Button>
                </div>
            </Dialog>
            </div>
            <h1>My Posts</h1>
        </div>
        </>
    )
}

export default Myposts
