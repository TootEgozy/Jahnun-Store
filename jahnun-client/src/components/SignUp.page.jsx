import React from 'react';
import { useState } from "react";
import { Redirect } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');


export default function SignUp({setUser, setToken}) {

    const [signedUp, setSignedUp] = useState(false);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const [errorMsg, setErrorMsg] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const eye = <FontAwesomeIcon icon={faEye} />;

    const createUser = async() => {
        try {

            setErrorMsg('');

            const response = await axios.post(
                'https://jahnun-store.herokuapp.com/api/user/createUser',  
                { 
                email: email,
                password: password,
                name: name,
                address: address,
                phoneNumber: phoneNumber
                });

                //console.log(response.data);

                setUser(response.data.publicUser);
                setToken(response.data.token);

                localStorage.setItem('user', JSON.stringify(response.data.publicUser));
                localStorage.setItem('token', JSON.stringify(response.data.token));

                //console.log(response.data);

                setSignedUp(true);
        }
        catch (e) {

            //console.log(e.response.data);

            if(e.response.data.includes('dup key: { email')) {
                setErrorMsg('Try a different email address.');
            }

            if(e.response.data.includes('dup key: { phoneNumber')) {
                setErrorMsg('Try a different phone number.')
            }

            if(e.response.data.includes('ValidationError: email: ')) {
                setErrorMsg('Please enter a valid email.')
            }

            if(e.response.data.includes('ValidationError: password: ')) {
                setErrorMsg('Please enter a stronger password ;).')
            }

            if(e.response.data.includes('ValidationError: name: ')) {
                setErrorMsg('Please enter your name.')
            }

            if(e.response.data.includes('ValidationError: address: ')) {
                setErrorMsg('Please enter your address so we can send you jahnun.')
            }

            if(e.response.data.includes('ValidationError: phoneNumber: ')) {
                setErrorMsg('Please enter an Israeli phone number.')
            }
        }
    }

    return (
        <div className='signup-container'>
            <div className='signup-card'>

                {(signedUp) ? <Redirect to='/'/> : ""}
                
                <h1>Sign Up</h1>

                <div className='email'>
                    <span>
                        Email:
                    </span>
                    <input type='text' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className='password'>
                    <span>
                        Password:
                    </span>
                    <input 
                    type={passwordShown ? "text" : "password"} 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <i 
                     onClick={togglePasswordVisiblity}
                     >{eye}</i>
                </div>

                <div className='name'>
                    <span>
                        Name:
                    </span>
                    <input type='text' 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className='address'>
                    <span>
                        Address:
                    </span>
                    <input type='text' 
                    value={address} 
                    onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div className='phone-number'>
                    <span>
                        Phone Number:
                    </span>
                    <input type='text' 
                    value={phoneNumber} 
                    onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </div>

                <span 
                className='signup-error-text'
                >
                    {errorMsg}
                </span>

                <button
                onClick={()=> createUser()}
                >
                    Sign Up
                </button>

            </div>
        </div>
    )
}
