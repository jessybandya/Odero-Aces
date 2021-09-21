import React, {useState, useEffect} from 'react';
import Header from './../Header'
import './style.css';
import FormSelect from './../forms/FormSelect';
import {db} from './../firebase';
import {auth} from './../firebase';

import {useParams} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';

function Profile() {
    const [user, setUser] = useState([]);
    const {currentUser} = auth
    const [followersCount, setFollowers]= useState(0);
    const [followingCount, setFollowing]= useState(0);
    const [birthday, setBirthday] = useState([]);
    const [cat, setCat] = useState("");
    const [firstName, setFirstName] = useState("");



    useEffect(() => {
        db.collection('follows').where("toId", "==", auth.currentUser.uid).where("read","==", false)
       .onSnapshot(snapshot => (
        setFollowing(snapshot.docs.length)
       ))
   }, []);
   useEffect(() => {
    db.collection('follows').where("idFollowed", "==", auth.currentUser.uid).where("read","==", false)
   .onSnapshot(snapshot => (
    setFollowers(snapshot.docs.length)
   ))
}, []);

    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    }) 

    const [profileUserData, setProfileUserData] = useState();


    const { username, uid } = useParams();
    
    document.title = `${uid}`

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


    const update = (e) => {
        e.preventDefault();

        // Add a new document in collection "cities"
        var washingtonRef = db.collection("users").doc(uid);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            firstName: firstName,
        })
        .then(() => {
            alert("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });


    }
    return (
        profileUserData ?(
            <>
            <Header user={profileUserData}/>
            <div id="navbar2" class=" emp-profile">
                <form method="post">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img class="card-img-top navbar-brand " src={profileUserData?.photoURL} alt=""/>
                                <div style={{marginLeft: "-15px",marginTop: "-20px",background: "#1E90FF"}} class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
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
                                        {/* <p class="proile-rating">RANKINGS : <span>8/10</span></p> */}
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
                        <div class="col-md-2">
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Edit Profile
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div style={{background: "#00BFFF"}}  class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style={{marginLeft: "0px",color: "#fff"}} >Profile Update</h5>
        <button type="button" class="close" data-dismiss="modal" style={{marginLeft: "0px",color: "#fff"}} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
          <div class="form-group" >
              <div style={{display: "flex",justifyContent: "space-between"}}>
              <div>
              <label style={{marginLeft: "0px",color: "#fff"}} >First Name ({profileUserData.firstName})</label>
            <input type="text" class="form-control" id="recipient-name" value={firstName}  onChange={(e) => {
                                setFirstName(e.target.value) }} style={{color: "#00BFFF"}}/>
            </div>
            <div>
              <label style={{marginLeft: "0px",color: "#fff"}} >Last Name ({profileUserData.lastName})</label>
            <input type="text" class="form-control" id="recipient-name" style={{color: "#00BFFF"}}/>
            </div>
            </div>
            <div style={{display: "flex",justifyContent: "space-between"}}>
              <div>
              <label style={{marginLeft: "0px",color: "#fff"}} >Middle Name ({profileUserData.middleName})</label>
            <input type="text" class="form-control" id="recipient-name" style={{color: "#00BFFF"}}/>
            </div>
            <div>
           
            </div>
            
            </div>
            <label for="recipient-name" class="col-form-label" style={{marginLeft: "0px",color: "#fff"}} >Registration No. ({profileUserData.reg})</label>
            <input type="text" class="form-control" id="recipient-name" style={{color: "#00BFFF"}}/>
            <div style={{display: "flex",justifyContent: "space-between"}}>
              
            <div>
              
            </div>
            </div>
            <h5 style={{marginLeft: "0%",color: "#fff"}} className="register__date">Date Of Birth</h5>
                    <div className="row1">
                        <select style={{color: "#00BFFF"}} className="register__date2" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                            <option value="Day" style={{marginLeft: "0%",color: "#00BFFF"}}>{profileUserData.birthday[0]}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>

                        <select style={{marginLeft: "0%",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                            <option value="Day" style={{marginLeft: "0%",color: "#00BFFF"}}>{profileUserData.birthday[1]}</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">Mar</option>
                            <option value="4">Apr</option>
                            <option value="5">May</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Aug</option>
                            <option value="9">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                        </select>
                       
                        <select style={{marginLeft: "0%",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                        <option style={{marginLeft: "0%",color: "#00BFFF"}} value="year">{profileUserData.birthday[2]}</option>
                            <option value="2018">2020</option>
                            <option value="2018">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                            <option value="1920">1920</option>
                            <option value="1919">1919</option>
                            <option value="1918">1918</option>
                            <option value="1917">1917</option>
                            <option value="1916">1916</option>
                            <option value="1915">1915</option>
                            <option value="1914">1914</option>
                            <option value="1913">1913</option>
                            <option value="1912">1912</option>
                            <option value="1911">1911</option>
                            <option value="1910">1910</option>
                            <option value="1909">1909</option>
                            <option value="1908">1908</option>
                            <option value="1907">1907</option>
                            <option value="1906">1906</option>
                            <option value="1905">1905</option>
                        </select>
                        
                        </div>
                        <div className="row1" style={{marginLeft: "-20px",color: "#fff",justifyContent: "space-between"}}>
                        <select style={{marginLeft: "0px",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                        
                        <option style={{marginLeft: "0px",color: "#00BFFF"}} ></option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                            </select>
                            <select style={{marginLeft: "0px",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                        
                        <option style={{marginLeft: "0px",color: "#00BFFF"}} ></option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                            </select>
                            <select style={{marginLeft: "0px",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                        
                        <option style={{marginLeft: "0px",color: "#00BFFF"}} ></option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                            </select>

                            <select style={{marginLeft: "0px",color: "#00BFFF"}} className="register__date3" onChange={(e) => setBirthday([...birthday, e.target.value])}>
                        
                        <option style={{marginLeft: "0px",color: "#00BFFF"}} ></option>
                            <option value="Mentor">Mentor</option>
                            <option value="Mentee">Mentee</option>
                            </select>
                            </div>
                            <label for="recipient-name" class="col-form-label" style={{marginLeft: "0px",color: "#fff"}} >Other Professions</label>
            <input type="text" class="form-control" id="recipient-name"></input>
          </div>
          {/* <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div> */}
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={update}>Save changes</button>
      </div>
    </div>
  </div>
</div>

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
                                <div class="tab-pane fade show active" id="home" style={{background: "white"}} role="tabpanel" aria-labelledby="home-tab">
                                            
                                            <div class="row" style={{display: "flex"}}>
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
