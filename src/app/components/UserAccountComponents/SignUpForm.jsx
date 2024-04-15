"use client"
import React, {useState} from 'react'
import axios from 'axios';

const SignUpForm = ({   email,
                        setEmail,
                        password,
                        setPassword,
                        invalidEmail,
                        setInvalidEmail,
                        invalidPass,
                        setInvalidPass,
                        userList,
                        setUserList,
                        addignNewUser,
                        setAddingNewUser,
                        loggedIn,
                        setLoggedIn }) => {
                            
    const [PWDisplay, setPWDisplay] = useState("password");
    const [cnfmPW, setCnfmPW] = useState("");
    const [matchPW, setMatchPW] = useState(true);
    const [userExists, setUserExisits] = useState(false);
                            
    return (
        <div>
            <h3>Create an Account</h3>
            <div style={{
                width: "300px",
                height: "200px",
                padding: "25px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "black",}}>
                <div>
                    <label for="email">Email</label>
                    <br />
                    <input
                        type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setInvalidEmail(false) }}>
                    </input>
                    {invalidEmail ? <p style={{color:"red", padding:"0", margin:"0"}}>! Invalid email</p> : <div><br/></div>}
                </div>
                <div>
                    <label for="password">Password</label>
                    <br />
                    <input
                        id='loginPW'
                        placeholder='Password'
                        type={PWDisplay}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}>
                    </input>
                    {invalidPass ? <p style={{color:"red", padding:"0", margin:"0"}}>! Invalid password</p> : 
                    !matchPW ? <p style={{color:"red", padding:"0", margin:"0"}}>! passwords must match</p> :<div><br/></div>}
                </div>

                <div>
                    <label for="password">Confirm Password</label>
                    <br />
                    <input
                        id='confirmPW'
                        placeholder='Password'
                        type={PWDisplay}
                        value={cnfmPW}
                        onChange={(e) => {
                            setCnfmPW(e.target.value);
                            setMatchPW(true);
                        }
                        }></input>
                    <div style={{   
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between"}}>
                        <div style={{   display:"flex", 
                                        alignItems:"center"}}>
                            <input id="PWcheckbox" type="checkbox" onClick={() => {
                                let y = document.getElementById("PWcheckbox").checked;
                                
                                {y? setPWDisplay("text") : setPWDisplay("password")};
                            }}></input>
                            <p> show password </p> 
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end" }}>
                            <button type="button" onClick={() => {
                                let newUser = {
                                    email: `${email}`,
                                    password: `${password}`
                                };
                                
                                let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                let emailString = email.toString();
                                let emailLowerCase = emailString.toLowerCase();
                                setEmail(emailLowerCase);
                                
                                if (email === "" || !email.match(emailFormat) ){
                                    setInvalidEmail(true);
                                } else {
                                    let existingUser = userList.filter((x) => {
                                        if (emailLowerCase == x.email){
                                            return x
                                        }
                                    })
                                    if (existingUser != "") {
                                        alert("Oops! an account has already been created using this email.");
                                    } else {
                                        if(cnfmPW !== password){
                                            setMatchPW(false);
                                        } else {                                           
                                            setMatchPW(true);
                                            let passFormat =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^()-_=+])[A-Za-z\d@$!%*#?&^()-_=+]{8,}$/;
                                            let testPW = passFormat.test(password);
                                            console.log(testPW);
                                            if (testPW == false) {
                                                alert("Invalid Password Format. Must contain one lowercase letter, one uppercase letter, one number, and one special character");

                                            } else {
                                                axios
                                                .post('https://rsproject01-car-data.vercel.app/users', newUser)
                                                .then((response) => {
                                                    setUserList([response.data, ...userList])
                                                    setAddingNewUser(false)
                                                    setLoggedIn(true)
                                                })
                                                .catch((error) => console.log(error));
                                            }
                                        }
                                    } 
                                }
                            }}>
                                Create account
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                }}>
                <p>Already have an account?</p>
                <button onClick={() => {
                    setEmail(""); 
                    setPassword("");
                    setCnfmPW("");
                    setInvalidEmail(false);
                    setInvalidPass(false);
                    setAddingNewUser(false); 
                    }
                }>Sign in</button>
            </div>
        </div>
    )
}

export default SignUpForm