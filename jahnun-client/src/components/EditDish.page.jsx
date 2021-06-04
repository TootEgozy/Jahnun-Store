import React, { useState } from 'react'
import { Redirect } from 'react-router';

const axios = require('axios');

export default function EditDish({user, token, dishInEdit, setDishInEdit}) {

    console.log('%cDish in edit in editdish:', 'background:pink; color: blue');
    console.log(dishInEdit);
    console.log(dishInEdit.name);

    const [done, setDone] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState(dishInEdit.name);

    const [price, setPrice] = useState(dishInEdit.price);

    const [stock, setStock] = useState(dishInEdit.stock);

    const [description, setDescription] = useState(dishInEdit.description);

    const [icon, setIcon] = useState(dishInEdit.icon);

    const [images, setImages] = useState(dishInEdit.images);


//description: "555555"
// icon: {fieldname: "productImages", originalname: "tulip.png", encoding: "7bit", mimetype: "image/png", destination: "image_uploads/", …}
// images: [{…}]
// isActive: true
// name: "node js"
// price: 5555
// stock: 555555

    const upperCaseName = (str)=> {
        const arr = str.split('');
        const upper = arr[0].toUpperCase();
        arr.splice(0, 1, upper);

        return arr.join('');
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

                <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
                <input 
                type="number"
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
                />
                <input 
                type="text"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />

                <div className='edit-icon-filed'>
                    <img alt='icon' src={icon.path}/>
                    <input 
                    type="file"
                    onChange={(e)=>setIcon(e.target.value)}
                    />
                </div>

                <div className='edit-images-filed'>

                    {images.map((img)=> {
                        return (<img alt='dish' src={img.path}/>)
                    })}

                    <input 
                    type="file"
                    onChange={(e)=>console.log(e.target.value)}
                    />

                </div>
                

                <br/>

                <button
                onClick={()=>deleteDish()}
                >Delete Dish</button>
                <p>{errorMsg}</p>

            </div>
        </div>
    )
}
