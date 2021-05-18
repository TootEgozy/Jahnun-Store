import React from 'react';
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');

//Fetch the about model and display it.

//If the user is not an admin, do nothing.

//If the user is admin, show pen icon on the about fields.
//Allow them to edit the about, with an input field & post request.
export default function About({user, token}) {
    
    const [editMode, setEditMode] = useState(false); 
    const [about, setAbout] = useState(null);

    useEffect(() => {
        (async()=> {
            if (!about) {
                try {
                    const response = await axios.get(
                    'https://jahnun-store.herokuapp.com/api/about/getAbout',  
                    { 
                        headers: { 
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNGZkZmI1MjgzNDExZDg1NTgyOTMiLCJpYXQiOjE2MjEzMzI1NTJ9.QNAgsn9WH4S2akPGpiD4CMtmr_j4_1n_gt8VkCk9bRA` 
                        }});
                    //await setAbout(response.data);

                    console.log(response.status);
                    console.log(response);
                }
                catch(e) {
                    console.log(e.response.data);
                }
            }
        })(); 
    });
    
    
    
    
    return (
        <div>
            <h1>In About</h1>
        </div>
    )
}
