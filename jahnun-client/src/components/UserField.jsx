import React from 'react';
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');

export default function UserField({field, user, token}) {

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(user[field]);

    const setUser = async(e) => {

        try {
            let payload = {};

            payload[field] = inputValue;

            console.log(payload);

            const response = await axios.post(
                'https://jahnun-store.herokuapp.com/api/user/editUser',
                payload, { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
            }); 

            console.log(response.data);
            
        }
        catch(e) {
            console.log(e.response.data);
        }




    
    }

    const pen = <FontAwesomeIcon icon={faPen} onClick={()=> setEditMode(true)}/>;

    const renderFields = () => {

        if(editMode) {
            return(
                <div className={`${field}-input`}>
                    <input 
                        type='text'
                        value={inputValue}
                        onChange={(e)=> setInputValue(e.target.value)}
                    />

                    <button
                        onClick={(e)=> setUser(e)}
                    >
                        Set
                    </button>
                </div>
            )
        }

        else return (
            <div className='field-display'>
                <div>
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
