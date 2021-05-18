import React from 'react';
import { useState, useEffect } from "react";
import AboutBox from './AboutBox';

const axios = require('axios');

//Fetch the about model and display it.

//If the user is not an admin, do nothing.

//If the user is admin, show pen icon on the about fields.
//Allow them to edit the about, with an input field & post request.
export default function About({user, token}) {
    
    const [about, setAbout] = useState(null);

    console.log('About in About:');
    console.log(about);
    console.log('_______________________________');

    useEffect(() => {
        (async()=> {
            if (!about) {
                try {
                    const response = await axios.get(
                    'https://jahnun-store.herokuapp.com/api/about/getAbout',  
                        { 
                            headers: { 
                            Authorization: `Bearer ${token}` 
                            }
                        }
                    );

                    console.log('response.data[0]')
                    console.log(response.data[0]);
                    await setAbout(response.data[0]);
                }
                catch(e) {
                    console.log(e.response.data);
                }
            }
        })(); 
    });

    if(about) {
        return (
            <div className='about-container'>
                <div className='about-card'>

                    <h1>About Jahnun</h1>

                    <AboutBox
                        user={user}
                        token={token}
                        str={about.intro}
                        fieldName={'intro'}
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />

                    <h2>My Jahnun</h2>

                    <AboutBox
                        user={user}
                        token={token}
                        str={about.product}
                        fieldName={'product'}
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />

                    <h2>My Policy</h2>

                    <AboutBox
                        user={user}
                        token={token}
                        str={about.policy}
                        fieldName={'policy'}
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />

                    <h2>Contact Me</h2>

                    <AboutBox
                        user={user}
                        token={token}
                        str={about.phoneNumber}
                        fieldName={'phoneNumber'} 
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />
                    <AboutBox
                        user={user}
                        token={token}
                        str={about.email}
                        fieldName={'email'}
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />
                    <AboutBox
                        user={user}
                        token={token}
                        str={about.details}
                        fieldName={'details'}
                        id={about._id}
                        setAbout={setAbout}
                        about={about}
                    />

                </div>
            </div>
        )
    }
    
    else return (
        <div>loading...</div>
    )
}
