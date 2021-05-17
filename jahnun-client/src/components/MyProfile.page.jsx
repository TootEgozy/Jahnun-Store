import React from 'react';
import { Redirect } from 'react-router-dom';
import UserField from './UserField';

export default function MyProfile({user, token}) {

    const fields = ['name', 'address', 'phoneNumber', 'email', 'password'];

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
                        />
                    )
                })}
            </div>
        </div>
     );

     else return (<div>Loading...</div>);
}
