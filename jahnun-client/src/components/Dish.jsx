import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function Dish({dish, orderDishes, setOrderDishes, user}) {

    const [imgPathsI, setI] = useState(0);
    const [amount, setAmount] = useState(0);
    
    const imgPaths = dish.images.map((img)=> img.path);

    //Go over this
    
    // In the state of the dish I will save the current place in the images array. For example 0.
    // On hover, increace the state by 1 so the src of the image will chane, creating a dinamic photo gallery.

    const handleHover = () => {
        for(let i = 0; i < imgPaths.length; i++) {

            setTimeout(() => {

                if(imgPathsI < imgPaths.length -1) setI(imgPathsI + 1);
                
                else setI(0); 
                
                i = 0; 

            }, 200);
        }
    }

    //On click, if the is a legal amount (sum > 0) then:
    //Increase the amount in state to display on the screen.
    //Create a new orderDishes array, with the updated amount, and set it to thestate of parent component 'menu'.
    //This array of orderDishes in menu will be used to create a new order object for the request.

    const handleClick = async(e) => {
        const sum = amount + Number(e.target.value);
        
        if (sum >= 0) {

            await setAmount(sum);

            const newDishes = [];
    
            orderDishes.forEach((d)=> {

                if (d.id !== dish._id) newDishes.push(d);
                
                else {
                    const newDish = {
                        id: d.id,
                        amount: sum
                    }
                    newDishes.push(newDish);
                }
            });
            await setOrderDishes(newDishes);
        }
    }

    let capsName = dish.name.split('');
    let start = capsName[0].toUpperCase();
    capsName.splice(0, 1, start);
    capsName.join('');

    const adminEditOption = () => {
        if(user.isAdmin) {
            console.log('admin');
            return (
                <Link to='/editDish'>
                    <FontAwesomeIcon className='pen-icon' icon={faPen} />
                </Link>
            )
        }
    }

    return (
        <React.Fragment>
            {adminEditOption()}
            <div 
            className='Dish-card-container'
            style={{border: '2px solid blue', margin: '5px'}}
            data={dish._id}
            >
                <div className='Dish-card'>
                <img 
                src={imgPaths[imgPathsI]} 
                alt={'dish'} 
                onMouseOver={()=> handleHover()}
                style={{width: '400px', height: '300px'}}
                />

                <h2>
                    <span>
                        <img alt='icon' src={dish.icon.path}/>
                    </span>
                    {capsName}
                </h2>
                <h3>{dish.description}</h3>
                <h4>Price: {dish.price}&#8362;</h4> 

                <button 
                className='dish-incresment' 
                value={1}
                onClick={(e)=> handleClick(e)}
                >
                    +
                </button>

                <span> {amount} </span>

                <button 
                className='dish-dencresment' 
                value={-1}
                onClick={(e)=> handleClick(e)}
                >
                    -
                </button> 

                </div>
            </div>
        </React.Fragment>
    )
}
