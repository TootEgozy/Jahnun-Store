import { useEffect, useState } from "react";
import React from 'react';
import Dish from "./Dish";
const axios = require('axios');

export default function Menu({user, token}) {

    const [dishes, setDishes] = useState(null);
    const [orderDishes, setOrderDishes] = useState(null);

    useEffect(() => {
        (async()=> {
            if (token && !dishes) {
                try {
                    const response = await axios.get(
                    'https://jahnun-store.herokuapp.com/api/dish/allDishes',  
                    { 
                        headers: { 
                        Authorization: `Bearer ${token}` 
                        }});
                    await setDishes(response.data);
                }
                catch(e) {
                    console.log(e);
                }
            }
        })(); 
    });

    (async()=> {
        if(dishes && !orderDishes) {

            const dishesIds = dishes.map((dish)=> { 
                return {id: dish._id, amount: 0}

            });
            await setOrderDishes(dishesIds);
        }
    })();

    const setNewDishesArr = (value) => {
        setOrderDishes(value);
    }

    //Conditional rendering
    
    if(!user || !dishes) return (<h1>loading</h1>);
    
    else return (
        <div className='menu-container'>
            <div className='menu'>
                <h1>In Menu</h1>
                <h2>{user.name}</h2>
                <h2>{token}</h2>
                <div>
                    {dishes.map((dish)=> {
                        return(
                        <Dish 
                        key={dish.id}
                        user={user} 
                        dish={dish}
                        orderDishes={orderDishes}
                        setOrderDishes={setNewDishesArr}
                        />
                        )
                    })}
                </div> 
            </div>
        </div>
    );
}
