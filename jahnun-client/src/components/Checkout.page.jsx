import React, { useState } from 'react'
import { Redirect } from 'react-router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const axios = require('axios');

export default function Checkout({user, token, order, setOrder, cities}) {

    const [dishes, setDishes] = useState(null);

    const [editMode, setEditMode] = useState(false);

    const [shipping, setShipping] = useState(0);

    const [address, setAddress] = useState(order.address);

    const [originalAddress, setOriginalAddress] = useState(order.address);

    const [pay, setPay] = useState(0);

    const [compeleted, setCompeleted] = useState(false);
    
    const [errorMsg, setErrorMsg] = useState('');

    const pen = <FontAwesomeIcon icon={faPen} onClick={()=> setEditMode(true)}/>;

    if(!user || order.cash <= 0) {
        return <Redirect to='/'/>
    }

    if(!dishes) {
        order.dishes.forEach(async(dish)=> {
            try {
                const response = await axios.get(
                    `https://jahnun-store.herokuapp.com/api/dish/allDishes`,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        }
                });        
                await setDishes(response.data);
            }
            catch(e) {
                console.log(e.response.data);
            }
        });
    }

    const saveSetAddress = async(e)=> {
        await setOriginalAddress(address);
        await setEditMode(false);
    }

    const cancelSetAddress = async(e)=> {
        await setAddress(originalAddress);
        await setEditMode(false);
    }

    const upperCaseName = (str)=> {
        const arr = str.split('');
        const upper = arr[0].toUpperCase();
        arr.splice(0, 1, upper);

        return arr.join('');
    }

    //I need to edit the address as weel for the final order
    const payForOrder = async(e)=> {
        try {
            if(pay != order.cash + Number(shipping)) {
                await setErrorMsg('Error: Credit declined.')
            }
            else {
                await setErrorMsg('');
                
                const sendOrder = JSON.parse(JSON.stringify(order));

                sendOrder.cash = order.cash + Number(shipping);
                sendOrder.isCompeleted = true;

                //>>Here: I need to edit the address as weel for the final order
    
                const response = await axios.post(
                    'https://jahnun-store.herokuapp.com/api/order/createOrder',
                    sendOrder, { 
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        }
                });
                //console.log(response.data);

                if(response.status === 200) {
                    setCompeleted(true);
                }               
            
            }
        }
        catch(e) {

        }
    }

    const renderInputAddress = () => {

        if(editMode) {
            return (
                <div className='address-input'>
                    <input
                    type='text'
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    />
                    
                    <button 
                    onClick={(e)=>saveSetAddress(e)}
                    >
                        Set
                    </button>

                    <button 
                    onClick={(e)=> cancelSetAddress(e)}
                    >
                        Cancel
                    </button>

                </div>
            )
        }
        else return (
            <div>{originalAddress}{pen}</div>
        )
    }

    const renderDishData = () =>{
        if(dishes) {
            return (
                <div className='dishes'>
                    {order.dishes.map((dish, index)=> {
                        return (
                            <tr>
                                <td className='icon-td'
                                ><img alt='icon' src={dishes[index].icon.path}/></td>

                                <td className='name-td'
                                >{upperCaseName(dishes[index].name)}</td>

                                <td className='amount-td'
                                >{dish.amount}</td>

                                <td className='price-td'
                                >{dishes[index].price}&#8362;</td>
                            </tr>
                        )
                    })}
                </div>
            )
        }
    }

    return (
        <div className='checkout-container'>
            <div className='checkout-card'>

                <h2>Checkout</h2>

                <span>City:</span>
                <select
                    onChange={async(e)=>await setShipping(e.target.value)}
                >
                    <option default>--select--</option>
                    {cities.map((city)=> {
                        const cityName = Object.keys(city);

                        return (<option value={city[cityName]}>{cityName}</option>)
                    })}
                </select>

                {renderInputAddress()}

                <span>{shipping}&#8362;</span>

                <table className='order-display-table'>
                    {renderDishData()}
                </table>

                <span>Total + Shipping: {order.cash + Number(shipping)}&#8362;</span>

                    <br></br>
                <input 
                className='payment-input'
                type='number'
                onChange={(e)=>setPay(Number(e.target.value))}
                />

                <button
                className='pay-button'
                onClick={(e)=>payForOrder(e)}
                >
                    Pay
                </button>

                <br></br>

                <span>{errorMsg}</span>

                {(compeleted)? <Redirect to='/'/> : ''}
            
            </div>
        </div>
    )
}
