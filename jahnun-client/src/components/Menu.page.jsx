import { useEffect, useState } from "react";
import React from 'react';
import Dish from "./Dish";
import { Link, Redirect } from 'react-router-dom';

const axios = require('axios');

export default function Menu({user, token, order, setOrder, dishInEdit, setDishInEdit}) {

    //dishes contains the response from the server to the request "get all dishes"
    //orderdishes contains only the dishes ID's to create the order object.
    //cash & setCash are passed to the dish components so that we can keep track on the price of the order throughout the entire process.


    const [dishes, setDishes] = useState(null);
    const [orderDishes, setOrderDishes] = useState(null);

    const [cash, setCash] = useState(0);

    //Wrapping to pass down:
    const currentDishInEdit = dishInEdit;

    const setCurrentDishInEdit = (value) => {
        setDishInEdit(value);
    }

    //If there are no dishes yet, make a request
    useEffect(() => {
        (async()=> {
            if (token && !dishes) {
                try {
                    const response = await axios.get(
                    'https://jahnun-store.herokuapp.com/api/dish/allDishes',  
                    //'/api/dish/allDishes',  
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

    //Create the orderDishes array
    (async()=> {
        if(dishes && !orderDishes) {

            const dishesIds = dishes.map((dish)=> { 
                return {id: dish._id, amount: 0}

            });
            await setOrderDishes(dishesIds);
        }
    })();

    // const setNewDishesArr = (value) => {
    //     setOrderDishes(value);
    // }

    //create a temp order object and set it to app's state. Once checkout is compeleted, this will be use to create a new order document in the database.
    const createNewOrder = async(e)=> {

        try {

            const tempOrder = {
                cash: cash,
                address: user.address,
                dishes: orderDishes
            }

            await setOrder(tempOrder);

        }
        catch(e) {
            console.log(e.response.data);
        }
    }

    //Conditional rendering - return loader if the request to get the menu is not yet compeleted.
    
    if(!dishes) {
        return (
            <div className='spinner-container'>
                <section className="talign-center">
                    <div className="spinner icon-spinner-5" aria-hidden="true"></div>
                </section>
            </div>
        );
    }
    else return (
        <div className='menu-container'>
            <div className='menu'>
                <h1>Menu</h1>
                <div className='dishes-in-menu'>

                    {dishes.map((dish)=> {
                        return(
                        <Dish 
                        key={dish.id}
                        user={user} 
                        dish={dish}
                        orderDishes={orderDishes}
                        setOrderDishes={setOrderDishes}
                        cash={cash}
                        setCash={setCash}
                        dishInEdit={currentDishInEdit} setDishInEdit={setCurrentDishInEdit}
                        />
                        )
                    })}

                    {user.isAdmin ? <Link to='/CreateDish' className='create-new-dish-link'>
                                        <button className='create-new-dish-button'>+</button>
                                    </Link>
                                    : 
                                    ""
                    }
                </div>

                <Link 
                to='/checkout'
                className='checkout-link'
                >
                    <button
                    className='checkout-button'
                    onClick={(e)=>createNewOrder(e)}
                    >
                        Checkout
                    </button>
                </Link> 
            </div>
        </div>
    );
}
