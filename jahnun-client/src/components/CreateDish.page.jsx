import axios from 'axios';
import React from 'react';
import { useState } from "react";

export default function CreateDish({user, token, dishInEdit, setDishInEdit}) {

    // You cannot add an icon to the first create dish request. Therefore the dish component holds a logic that redirects the admin to this page if an icon has not yet been added.
    
    //'dishInEdit' holds the dish data after the first request.
    // Once the new dish is compelete, It should be set to null. 

    const [errorMsg, setErrorMsg] = useState('');

    const [dish, setDish] = useState(null);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);

    const toggleIsActive = () => {
        isActive ? setIsActive(false) : setIsActive(true);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        await setErrorMsg('');


        if(!price || !name | !description || !stock || !image) {
            await setErrorMsg('All the fileds are required, please fill them.');
        }

        else {
            try {
                const data = new FormData();

                data.append('price', price);
                data.append('name', name);
                data.append('description', description);
                data.append('stock', stock);
                data.append('isActive', isActive);
                data.append('productImage', image);


                const response = await axios.post(  
                '/api/dish/createDish', data, 
                { 
                    headers: { 
                    Authorization: `Bearer ${token}` 
                }}
                );

                await setDish(response.data);
                await setDishInEdit(response.data);

                console.log(response.data);
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    // If a dish is in edit - after sending the request & before adding an icon - render a dish card and and icon input field.
    // If it's a new dish, render a form to create a new dish.

    if (dishInEdit) {
        return (
            <div className='dish-in-edit-card'>
                <span>{dishInEdit.name}</span>
                <br/>
                <span>{dishInEdit.price}</span>
                <br/>
                <span>{dishInEdit.description}</span>
                <br/>
                <span>{dishInEdit.stock}</span>
                <br/>
                <span>{dishInEdit.isActive}</span>
                <br/>
                <image alt='dish image' src={dishInEdit.images[0].path}/>
            </div>
        )
    }
    
    else return (
        <div className='create-dish-container'>
            <div className='create-dish'>

                <h1>Create a New Dish</h1>

                <form className='create-dish-form'
                onSubmit={(e)=>handleSubmit(e)}
                >

                    <div className='name-input'>
                        <span htmlFor='input-1'> Dish Name:</span>
                        <input 
                        type='text'
                        className='input-1'
                        onChange={(e)=>setName(e.target.value)}
                        ></input>
                    </div>

                    <div className='price-input'>
                        <span htmlFor='input-2'>Price:</span>
                        <input 
                        type='number'
                        className='input-2'
                        onChange={(e)=>setPrice(e.target.value)}
                      ></input>
                    </div>

                    <div className='description-input'>
                        <span htmlFor='input-3'>Description:</span>
                        <textarea 
                        type='textarea'
                        className='input-3'
                        rows='2'
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className='stock-input'>
                        <span htmlFor='input-4'>Stock:</span>
                        <input 
                        type='number'
                        className='input-4'
                        onChange={(e)=>setStock(e.target.value)}
                      ></input>
                    </div>

                    <div className='isActive-input'>
                        <span htmlFor='input-5'>Active Dish:</span>
                        <input 
                        type='checkbox'
                        className='input-5'
                        checked={isActive}
                        onChange={()=>toggleIsActive()}
                        ></input>
                    </div>

                    <div className='file-input'>
                        <span htmlFor='input-6'>Image:</span>
                        <input 
                        type='file'
                        className='input-6'
                        onChange={(e)=>setImage(e.target.files[0])}
                        ></input>
                    </div>

                    <button className='dish-submit-button'>Submit</button>

                    <span className='error-msg'>{errorMsg}</span>

                </form>

            </div>        
        </div>
    )
}
