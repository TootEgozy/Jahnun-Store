import React, { useState } from 'react'
import { Redirect } from 'react-router'

const axios = require('axios');

export default function Checkout({user, token, order, setOrder}) {

    const [dishIcons, setDishIcons] = useState(null);


    if(!user) {
        return <Redirect to='/'/>
    }

    if(!dishIcons) {

        const tempDishIcons = [];

        order.dishes.forEach(async(dish)=> {
            try {

                const payload = {id: dish.id};

                const response = await axios.get(
                    'https://jahnun-store.herokuapp.com/api/dish/getDishById',
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

        });
    }



    return (
        <div className='checkout-container'>
            <div className='checkout-card'>
                <h2>Checkout</h2>

            </div>
        </div>
    )
}
