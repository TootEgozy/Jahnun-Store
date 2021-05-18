import React from 'react';
import { Redirect } from 'react-router-dom';
import UserField from './UserField';

const axios = require('axios');


export default function MyProfile({user, token, setUser, setToken}) {

    const fields = ['name', 'address', 'phoneNumber', 'email', 'password'];

    const innerSetUser = (value) => {
        setUser(value);
    }

    const logOutUser = async(e)=> {
        try {
            let payload = {email: 'guest@gmail.com', password: '123456'};
  
            let res = await axios.post('https://jahnun-store.herokuapp.com/api/user/login', payload);
  
            let data = res.data;
  
            await localStorage.setItem('user', JSON.stringify(data.user));
            await localStorage.setItem('token', JSON.stringify(data.token));
  
            await setUser(JSON.stringify(data.user));
            await setToken(data.token);
          }
          catch(e) {
            console.log(e.response.data);
          }
    }

     if(user) return (
        <div className='my-profile-container'>
            <div className='my-profile-card'>

                {(user.email === 'guest@gmail.com') ? <Redirect to='/'/> : '' }

                {fields.map((field)=> {
                    return (
                        <UserField 
                            key={field}
                            field={field}
                            user={user}
                            token={token}
                            innerSetUser={innerSetUser}
                        />
                    )
                })}

                <button
                onClick={(e)=>logOutUser(e)}
                >
                    Log Out
                </button>
            </div>
        </div>
     );

     else return (<div>Loading...</div>);
}
