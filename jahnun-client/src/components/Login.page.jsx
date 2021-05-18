import React from 'react';
import { useState } from "react";
import { Redirect } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');


const eye = <FontAwesomeIcon icon={faEye} />;

export default function Login({user, token, setUser, setToken}) {

    const [password, setPassword] = useState('');
    const [stayLoggedin, setStayLoggedin] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleSubmit = async(e)=> {
        const inEmail = e.target.parentElement.children[1].children[1].value;
        const inPassword = password;

        if(inEmail && inPassword) {
            (async()=> {
                try {
                    const response = await axios.post(
                    'https://jahnun-store.herokuapp.com/api/user/login',  
                    { 
                    email: inEmail,
                    password: inPassword
                    });

                    await setUser(response.data.user);
                    await setToken(response.data.token);

                    if(stayLoggedin) {

                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        localStorage.setItem('token', JSON.stringify(response.data.token));
                    }
                    if(response.status === 200) {
                        setLoggedIn(true);
                        setErrorMsg('');
                    }
                }
                catch(e) {
                    setErrorMsg('Wrong email / password. Try again');
                }
            })(); 
        }
    }

    const handleCheck = (e)=> {
        stayLoggedin ? setStayLoggedin(false) : setStayLoggedin(true);
    }

    return (
        <div className='login-container'>

            {(loggedIn)? <Redirect to='/'/> : ''}

            <div className='login-card'>
                <h1>Login</h1>

                <div className='email'>
                    <span className='email-title'>Email:</span>
                    <input className='email-input' type='text'/>
                </div>

                <div className='password'>
                    <span className='password-title'>Password:</span>
                    <input 
                    className='password-input' 
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    /> 
                     <i 
                     onClick={togglePasswordVisiblity}
                     >{eye}</i>                  
                </div>

                <input 
                type="checkbox" 
                name="stayLoggedIn" 
                checked={stayLoggedin}
                onChange={(e)=>handleCheck(e)}
                />
                <label htmlFor="stayLoggedIn">Stay logged in    </label>

                <button 
                className='login-submit-button'
                onClick={(e)=>handleSubmit(e)}
                >
                Login
                </button>
                <span className='login-error-msg'>{errorMsg}</span>
            </div>
        </div>
    )
}
