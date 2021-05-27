import axios from 'axios';
import React from 'react';
import { useState } from "react";

export default function CreateDish({user, token, dishInEdit, setDishInEdit}) {

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

        // const dish= {
        //     price: price,
        //     name: name,
        //     description: description,
        //     stock: stock,
        //     isActive: isActive,
        // }

        // const             productImage= image
    
        // console.log(dish);

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
    
    return (
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
                        defaultValue={dishInEdit? dishInEdit.name : ''}
                        ></input>
                    </div>

                    <div className='price-input'>
                        <span htmlFor='input-2'>Price:</span>
                        <input 
                        type='number'
                        className='input-2'
                        onChange={(e)=>setPrice(e.target.value)}
                        defaultValue={dishInEdit? dishInEdit.price : 0}
                        ></input>
                    </div>

                    <div className='description-input'>
                        <span htmlFor='input-3'>Description:</span>
                        <textarea 
                        type='textarea'
                        className='input-3'
                        rows='2'
                        onChange={(e)=>setDescription(e.target.value)}
                        defaultValue={dishInEdit? dishInEdit.description : ''}
                        ></textarea>
                    </div>

                    <div className='stock-input'>
                        <span htmlFor='input-4'>Stock:</span>
                        <input 
                        type='number'
                        className='input-4'
                        onChange={(e)=>setStock(e.target.value)}
                        defaultValue={dishInEdit? dishInEdit.stock : 0}
                        ></input>
                    </div>

                    <div className='isActive-input'>
                        <span htmlFor='input-5'>Active Dish:</span>
                        <input 
                        type='checkbox'
                        className='input-5'
                        checked={isActive}
                        onChange={()=>toggleIsActive()}
                        defaultValue={dishInEdit? dishInEdit.isActive : true}
                        ></input>
                    </div>

                    <div className='file-input'>
                        <span htmlFor='input-6'>Image:</span>
                        <input 
                        type='file'
                        className='input-6'
                        onChange={(e)=>setImage(e.target.files[0])}
                        defaultValue={dishInEdit? dishInEdit.image : null}
                        ></input>
                    </div>

                    <button className='dish-submit-button'>Submit</button>

                    <span className='error-msg'>{errorMsg}</span>

                </form>

            </div>        
        </div>
    )
}
