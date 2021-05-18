import { useState } from "react";
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

export default function AboutBox({user, token, str, fieldName, id, setAbout, about}) {

    const [editMode, setEditMode] = useState(false);
    const [originalValue, setOriginalValue] = useState(str);
    const [inputValue, setInputValue] = useState(str);

    const editAbout = async(e)=> {

        try {
            let payload = {};

            payload[fieldName] = inputValue;
            payload['id'] = id;

            console.log('payload');
            console.log(payload);

            const response = await axios.post(
                'https://jahnun-store.herokuapp.com/api/about/editAbout',
                payload, { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
            });
            console.log('response.data:');
            console.log(response.data);

            let newAbout = JSON.parse(JSON.stringify(about));

            newAbout[fieldName] = response.data[fieldName];

            console.log('new About:');
            console.log(newAbout);

            await setAbout(response.data); 

            setEditMode(false);
        }
        catch(e) {
            console.log('error:');
            console.log(e);
            console.log(e.response.data);
        }
    }

    const cancelEdit = async(e) => {

        await setInputValue(originalValue);
        await setEditMode(false);
    }
    


    const adminEditOption = () => {
        if(user.isAdmin) {
            return (
               <span className='admin-pen-edit'>
                   <FontAwesomeIcon className='pen-icon' icon={faPen} 
                   onClick={()=>setEditMode(true)}
                   />
               </span> 
            )
        }
    }

    const renderEditOrNot =()=> {
        if(editMode) {
            return (
                <div className='edit-about-wrapper'>
                    <input 
                    className='about-input'
                    type='text'
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                    >
                    </input>

                    <button
                    onClick={(e)=>editAbout(e)}
                    >
                        Set
                    </button>

                    <button
                    onClick={(e)=>cancelEdit(e)}
                    >
                        cancel
                    </button>
                </div>
                
            )
        }
        else return (
            <div>{str}</div>
        )
    }

    return (
        <React.Fragment>
            {adminEditOption()}
            {renderEditOrNot()}
        </React.Fragment>
    )
}
