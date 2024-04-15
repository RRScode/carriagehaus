"use client"
import React, { useState } from 'react'


export const LogInForm = ({ email,
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

    const [PWDisplay, setPWDisplay] = useState("password")

    

    const loginUser = () => {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailString = email.toString();
        let emailLowerCase = emailString.toLowerCase();
        setEmail(emailLowerCase);

        if (email === "" || !email.match(emailFormat)) {
            setInvalidEmail(true);
        } else {
            let user = userList.filter((x) => {
                    if (x.email == emailLowerCase) {
                        return x
                    }
                }
            )
            if (user == "") {
                setInvalidEmail(true)
            } else {
                setInvalidEmail(false);

                if (password == "") {
                    setInvalidPass(true)
                } else {
                    let passValidation = user.filter((x) => {
                            if (password === x.password) {
                                return x
                            }
                        }
                    )
                    if (passValidation == "") {
                        setInvalidPass(true)
                    } else {
                        setInvalidPass(false);
                        setLoggedIn(true);
                    }
                }
            }
        }
    };



    return (
        <div>
            <h3>Sign in</h3>
            <div style={{
                width: "300px",
                height: "200px",
                padding: "25px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "black",
                }}>
                <div>
                    <label for="email">Email</label>
                    <br />
                    <input
                        type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value), setInvalidEmail(false)}}
                    ></input>
                    {invalidEmail ?   
                        <p  style={{ 
                                color: "red",
                                padding: "0", 
                                margin: "0" }}>
                            ! Invalid email
                        </p> 
                        : 
                        <div>
                            <br/>
                        </div>
                    }
                </div>
                <div>
                    <label for="password">Password</label>
                    <br />
                    <input
                        id='loginPW'
                        placeholder='Password'
                        type={PWDisplay}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value), setInvalidPass(false) }}
                    >
                    </input>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input id="PWcheckbox" type="checkbox" onClick={() => {
                            let y = document.getElementById("PWcheckbox").checked;

                            if (y == true) {
                                setPWDisplay("text");
                            } else {
                                setPWDisplay("password");
                            }

                        }}></input>
                        <p> show password </p>
                    </div>
                    {invalidPass ? 
                        <p style={{ 
                            color: "red", 
                            padding: "0", 
                            margin: "0" }}>
                            ! Invalid password
                        </p> 
                        : 
                        <div>
                            <br/>
                        </div>
                    }
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",}}>
                    <button type="button" onClick={() => { loginUser() }}>Submit</button>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",       }}>
                <h3>Or</h3>
                <button onClick={() => {
                        setEmail("");
                        setPassword("");
                        setInvalidEmail(false);
                        setInvalidPass(false);
                        setAddingNewUser(true);}}>
                    Create Account
                </button>
                <br/>
                <button onClick={() => {setLoggedIn(true)}}>skip</button>
            </div> 
        </div>
    )
}
