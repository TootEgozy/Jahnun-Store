import React, { useState } from 'react'
import { Redirect } from 'react-router';

const axios = require('axios');

export default function EditDish({user, token, dishInEdit, setDishInEdit}) {

    const [done, setDone] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState(dishInEdit.name);

    const [price, setPrice] = useState(dishInEdit.price);

    const [stock, setStock] = useState(dishInEdit.stock);

    const [description, setDescription] = useState(dishInEdit.description);

    const [isActive, setIsActive] = useState(dishInEdit.isActive);

    const [icon, setIcon] = useState(dishInEdit.icon);

    const [images, setImages] = useState(dishInEdit.images);

    const upperCaseName = (str)=> {
        const arr = str.split('');
        const upper = arr[0].toUpperCase();
        arr.splice(0, 1, upper);

        return arr.join('');
    }

    const editDishInfo = async()=> {

        const payLoad = {
            id: dishInEdit._id,
            name: name,
            price: price,
            stock: stock,
            description: description,
            isActive: isActive
        }
        try {
            const response = await axios.post('https://jahnun-store.herokuapp.com/api/dish/editDish', payLoad, {headers: {
                Authorization: `Bearer ${token}`
            }});

            console.log('response:');
            console.log(response.data);
            
            if(response.status === 200) {
                setDishInEdit(response.data);
            }
        }
        catch(e) {
            console.log(e.response.value);
        }
    }

    const cancelChanges = () => {
        setName(dishInEdit.name);
        setPrice(dishInEdit.price);
        setStock(dishInEdit.stock);
        setDescription(dishInEdit.description);
        setIsActive(dishInEdit.isActive);
    }

    const editIcon = async() => {

        const id = dishInEdit._id;

        const data = new FormData();
        data.append('productIcon', icon);
        data.append('id', id);

        console.log(id, icon);

        try {
            const response = await axios.post('https://jahnun-store.herokuapp.com/api/dish/editIcon', data, {headers: {
                Authorization: `Bearer ${token}`
            }});

            console.log(response.data);
            if (response.status === 200) {
                setDishInEdit(response.data);
            }
        }
        catch(e) {
            console.log(e.response);
        }
    }

    const deleteDish = async() => {

        setErrorMsg('');

        try {
            const approve = window.confirm(`Are you sure you want to delete the dish ${dishInEdit.name}?`);

            if(approve) {
                const payLoad = {};

                payLoad['id'] = dishInEdit._id;

                const response = await axios({
                    url: 'https://jahnun-store.herokuapp.com/api/dish/deleteDish',
                    method: 'delete',
                    data: payLoad,
                    headers: {Authorization: `Bearer ${token}`}
                });
    
                if(Number(response.status) === 200) {
                    
                    console.log(response.data);

                    await setDone(true);

                    await setDishInEdit(null);
                }
            }            
        }
        catch(e) {
            console.log(e.response.data);
        }
    }

    if(done) return (<Redirect to='/'/>)

    else return (
        <div className='edit-dish-container'>
            <div className='edit-dish'>
                <h1>Edit Dish: {upperCaseName(dishInEdit.name)}</h1>
                <image alt='dish' src={dishInEdit.images[0].path}/>

                <div className='edit-dish-name'>
                    <h3>Name:</h3>
                    <input 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
               
                <div className='edit-dish-price'>
                    <h3>Price:</h3>
                    <input 
                    type="number"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>
                
                <div className='edit-dish-stock'>
                    <h3>Stock</h3>
                    <input 
                    type="number"
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}
                    />
                </div>
                
                <div className='edit-dish-description'>
                    <h3>Description</h3>
                    <textarea 
                    type="text"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>
            
                <div className='edit-dish-isActive'>
                    <h3>Active Dish?</h3>
                    <input 
                    type="checkbox"
                    checked={isActive}
                    onChange={()=>{
                        isActive? setIsActive(false) : setIsActive(true);
                    }}
                    />
                </div>

                <button 
                className='edit-dish-info'
                onClick={()=>editDishInfo()}
                >Set</button>

                <button
                className='cancel-changes-info'
                onClick={()=>cancelChanges()}
                >Cancel</button>
         
                <br/>
                <hr/>
                <br/>

                <div className='edit-dish-icon'>
                    <h3>Change Dish Icon</h3>
                    <img alt='icon' src={icon.path}/>
                    <input 
                    type="file"
                    onChange={(e)=>setIcon(e.target.value)}
                    />
                </div>
                <button
                className='edit-dish-icon-button'
                onClick={()=>editIcon()}
                >Set
                </button>

                <br/>
                <hr/>
                <br/>

                <div className='edit-dish-images'>
                    <h3>Edit Dish Images</h3>

                    {images.map((img)=> {
                        return (<img alt='dish' src={img.path}/>)
                    })}

                    <br/>

                    <input 
                    type="file"
                    onChange={(e)=>console.log(e.target.value)}
                    />

                    <button>Add Images to the dish</button>
                    <button>Replace dish images</button>

                </div>
                

                <br/>
                <hr/>
                <br/>

                <button
                onClick={()=>deleteDish()}
                >Delete Dish</button>
                <p>{errorMsg}</p>

            </div>
        </div>
    )
}
