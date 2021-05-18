import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function Dish({dish, orderDishes, setOrderDishes, user, cash, setCash}) {

    const [imgPathsI, setI] = useState(0);
    const [amount, setAmount] = useState(0);
    
    const imgPaths = dish.images.map((img)=> img.path);

    const handleHover = () => {

        if(imgPathsI < imgPaths.length -1) setI(imgPathsI + 1);
        else setI(0);
    }

    const handleClick = async(e) => {

        const pay = dish.price * e.target.value;

        const sum = amount + Number(e.target.value);
        
        if (sum >= 0) {

            await setAmount(sum);

            await setCash(cash + pay);

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
                value={-1}
                onClick={(e)=> handleClick(e)}
                >
                    -
                </button>

                <span> {amount} </span>

                <button 
                className='dish-dencresment' 
                value={1}
                onClick={(e)=> handleClick(e)}
                >
                    +
                </button> 

                </div>
            </div>
        </React.Fragment>
    )
}
