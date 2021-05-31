import axios from 'axios';
import React from 'react';
import { useState } from "react";
import { Redirect } from 'react-router';

export default function CreateDish({user, token}) { 

    const [errorMsg, setErrorMsg] = useState('');

    const [done, setDone] = useState(false);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);

    const toggleIsActive = () => {
        isActive ? setIsActive(false) : setIsActive(true);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        await setErrorMsg('');


        if(!price || !name | !description || !stock || !image ||!icon) {
            await setErrorMsg('All the fileds are required, please fill them.');
        } 

        else if (icon.size > 7000) setErrorMsg('Icon size is too big. Limit is 7kb');

        else {
            try {
                const data = new FormData();

                data.append('price', price);
                data.append('name', name);
                data.append('description', description);
                data.append('stock', stock);
                data.append('isActive', isActive);
                data.append('productImages', image);
                data.append('productImages', icon);


                const response = await axios.post(  
                '/api/dish/createDish', data, 
                { 
                    headers: { 
                    Authorization: `Bearer ${token}` 
                }}
                );

                await setDone(true);
                console.log(response.data);
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    // If a dish is in edit - after sending the request & before adding an icon - render a dish card and and icon input field.
    // If it's a new dish, render a form to create a new dish.

    // if (dishInEdit) {
    //     return (
    //         <div className='dish-in-edit-card'>
    //             <span>{dishInEdit.name}</span>
    //             <br/>
    //             <span>{dishInEdit.price}</span>
    //             <br/>
    //             <span>{dishInEdit.description}</span>
    //             <br/>
    //             <span>{dishInEdit.stock}</span>
    //             <br/>
    //             <span>{dishInEdit.isActive}</span>
    //             <br/>
    //             <image alt='dish image' src={dishInEdit.images[0].path}/>
    //         </div>
    //     )
    // }
    
    if(done) return (<Redirect to='/'/>)
    
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

                    <div className='image-input'>
                        <span htmlFor='input-6'>Image:</span>
                        <input 
                        type='file'
                        className='input-6'
                        onChange={(e)=>setImage(e.target.files[0])}
                        ></input>
                    </div>

                    <div className='icon-input'>
                        <span htmlFor='input-7'>Icon:</span>
                        <input 
                        type='file'
                        className='input-6'
                        onChange={(e)=>setIcon(e.target.files[0])}
                        ></input>
                    </div>

                    <button className='dish-submit-button'>Submit</button>

                    <span className='error-msg'>{errorMsg}</span>

                </form>

            </div>        
        </div>
    )
}
