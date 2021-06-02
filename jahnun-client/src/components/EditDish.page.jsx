import React, { useState } from 'react'
import { Redirect } from 'react-router';

const axios = require('axios');

export default function EditDish({user, token, dishInEdit, setDishInEdit}) {

    const [done, setDone] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const upperCaseName = (str)=> {
        const arr = str.split('');
        const upper = arr[0].toUpperCase();
        arr.splice(0, 1, upper);

        return arr.join('');
    }

    const deleteDish = async() => {

        setErrorMsg('');

        try {

            const approve = window.confirm(`Are you sure you want to delete the dish ${dishInEdit.name}?`);

            if(approve) {
                const payLoad = {};

                payLoad['id'] = dishInEdit._id;

                const response = await axios({
                    url: 'https://jahnun-store.herokuapp.com/api/dish/deleteDish',
                    method: 'delete',
                    data: payLoad,
                    headers: {Authorization: `Bearer ${token}`}
                });
    
                if(Number(response.status) === 200) {
                    
                    console.log(response.data);

                    await setDone(true);

                    await setDishInEdit(null);

                }
            }            
        }
        catch(e) {
            console.log(e.response.data);
        }
    }

    if(done) return (<Redirect to='/'/>)

    else return (
        <div className='edit-dish-container'>
            <div className='edit-dish'>
                <h1>Edit Dish: {upperCaseName(dishInEdit.name)}</h1>
                <image alt='dish' src={dishInEdit.images[0].path}/>

                <button
                onClick={()=>deleteDish()}
                >Delete Dish</button>
                <p>{errorMsg}</p>

            </div>
        </div>
    )
}
