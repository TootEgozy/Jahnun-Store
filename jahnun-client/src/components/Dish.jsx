import { useState } from "react";
import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function Dish({dish, orderDishes, setOrderDishes, user, cash, setCash, dishInEdit}) {

    const [imgPathsI, setI] = useState(0);
    const [amount, setAmount] = useState(0);
    
    const imgPaths = dish.images.map((img)=> img.path);

    //If a dish is being created, and is not compeleted (missing an icon) - return to the create dish page. Else, 'dishInEdit' should be null and the dish component would render.
   if(dishInEdit) {
       return (<Redirect to='createDish'/>);
   }

    const handleHover = () => {

        setTimeout(()=> {
            if(imgPathsI < imgPaths.length -1) setI(imgPathsI + 1);
            else setI(0);
        },100);
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
            <div 
            className='Dish-card-container'
            data={dish._id}
            >
                <div className='Dish-card'>
                {adminEditOption()}
                <img 
                src={imgPaths[imgPathsI]} 
                alt={'dish'} 
                onMouseOver={()=> handleHover()}
                />

                <h2 className='dish-title'>
                    <span>
                        <img alt='icon' src={dish.icon.path}/>
                    </span>
                    <span className='dish-title-text'>
                    {capsName}
                    </span>
                    
                </h2>
                <h3 className='dish-description'>{dish.description}</h3>
                <h4 className='dish-price'>Price: {dish.price}&#8362;</h4> 

                <div className='buttons-and-input'>
                    <button 
                    className='dish-incresment' 
                    value={-1}
                    onClick={(e)=> handleClick(e)}
                    >
                        -
                    </button>

                    <span className='amount'> {amount} </span>

                    <button 
                    className='dish-decresment' 
                    value={1}
                    onClick={(e)=> handleClick(e)}
                    >
                        +
                    </button> 
                </div>
                

                </div>
            </div>
        </React.Fragment>
    )
}
