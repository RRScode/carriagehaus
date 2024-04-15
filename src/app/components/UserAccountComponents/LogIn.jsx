'use client'
import React, {useState, useEffect} from 'react';
import {LogInForm} from './LogInForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import axios from 'axios';

const LogIn = ({loggedIn, setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [addingNewUser, setAddingNewUser] = useState(false);
    const [userList, setUserList] = useState([])

    
    useEffect(() => {
            axios
            .get(`https://rsproject01-car-data.vercel.app/users`)
            .then((response) => {
                    setUserList(response.data);
                }
            )
        },
        []
    );
    
    return (
        <div>
            <h1>Carriage Haus</h1>
            <div style={{
                display: "flex",
                marginTop: "80px",
                justifyContent: "center",
                }}>
                {addingNewUser ? 
                    <SignUpForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        invalidEmail={invalidEmail}
                        setInvalidEmail={setInvalidEmail}
                        invalidPass={invalidPass}
                        setInvalidPass={setInvalidPass}
                        userList={userList}
                        setUserList={setUserList}
                        addignNewUser={addingNewUser}
                        setAddingNewUser={setAddingNewUser}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                    />
                :
                
                    <LogInForm 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        invalidEmail={invalidEmail}
                        setInvalidEmail={setInvalidEmail}
                        invalidPass={invalidPass}
                        setInvalidPass={setInvalidPass}
                        userList={userList}
                        setUserList={setUserList}
                        addignNewUser={addingNewUser}
                        setAddingNewUser={setAddingNewUser}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                    />
                }           
            </div>
        </div>                
    )
}

export default LogIn