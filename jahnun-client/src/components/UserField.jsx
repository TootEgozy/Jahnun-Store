import React from 'react';
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');

export default function UserField({field, user, token, innerSetUser}) {

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(user[field]);

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
    if(field === 'password') setInputValue('password');

    },[]);
    
    const upperCaseName = (str)=> {
        const arr = str.split('');
        const upper = arr[0].toUpperCase();
        arr.splice(0, 1, upper);

        return arr.join('');
    }

    const setUser = async(e) => {

        try {
            let payload = {};

            payload[field] = inputValue;

            const response = await axios.post(
                'https://jahnun-store.herokuapp.com/api/user/editUser',
                payload, { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
            });
            //console.log(response.data); 

            if(response.status === 200) {

                await setInputValue(response.data[field]);

                await setEditMode(false);

                await innerSetUser(response.data);

                await localStorage.setItem('user', JSON.stringify(response.data));

            }   
        }
        catch(e) {
            //console.log(e.response.data);
            await setErrorMsg('Please try another');
        }
    }

    const cancelEdit = async(e) => {

        await setInputValue(user[field]);
        await setEditMode(false);

    }

    const pen = <FontAwesomeIcon icon={faPen} className='pen-icon' onClick={()=> setEditMode(true)}/>;

    const renderFields = () => {

        if(editMode) {
            return(
                <div className={`field-input`}>
                    <textarea 
                        value={inputValue}
                        onChange={(e)=> setInputValue(e.target.value)}
                    />

                    <button
                        onClick={(e)=> setUser(e)}
                    >
                        Set
                    </button>

                    <button
                    onClick={(e)=> cancelEdit(e)}
                    >
                        Cancel
                    </button>

                    <span className='error-msg'>{errorMsg}</span>
                </div>
            )
        }

        else return (
            <div className='field-display'>
                <div>
                    <span className='field-name-display'>{upperCaseName(field)}: </span>
                    <br/>
                    <span className='field-value-display'>{inputValue}</span>
                    {pen}                
                </div>
            </div>
        )
    }

    return (
        <div className='user-filed-container'>
            {renderFields()}
        </div>
    )
}
