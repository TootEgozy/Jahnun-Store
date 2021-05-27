import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Navbar({user, token}) {

    const userLoggedIn = () => {
        if(user && user.email !== 'guest@gmail.com') {
            return (
                <Link to='/myProfile'>
                    <li className='navbar-li-link'>Hello {user.name ? user.name : <Redirect to='/'/>}
                    </li>
                </Link>       
            )
        }
    }

    const adminLoggedIn = () => {
        if(user.isAdmin) {
            return (
                <React.Fragment>
                    <Link to='/allOrders'>
                              <li className='navbar-li-link'>Orders</li>
                          </Link>
                          <Link to='/allUsers'>
                              <li className='navbar-li-link'>Users</li>
                          </Link>

                </React.Fragment>
            )
        }  
    }

    const guestLoggedIn = () => {
        if(user.email === 'guest@gmail.com') {
            return (
                <React.Fragment>
                    <Link to='/'>
                        <li className='navbar-li-link'>Hello, Guest</li>
                      </Link>
                    <Link to='/login'>
                          <li className='navbar-li-link'>Have an Account? login</li>
                      </Link>
                      <Link to='/signUp'>
                          <li className='navbar-li-link'>Sign Up</li>
                      </Link>
                </React.Fragment>
            )
        }
    }

    if(!user) {
        return (<div className='empty-navbar'>Just a sec...</div>);
    }

    else if(user) {

        return (
            <div className='navbar-container'>
                <div className='navbar'>
                    <ul className='navbar-list'>
                    {guestLoggedIn()}
                    {userLoggedIn()}
                      <Link to='/about'>
                          <li className='navbar-li-link'>About</li>
                      </Link>
                      <Link to='/'>
                          <li className='navbar-li-link'>Menu</li>
                      </Link>
                      {adminLoggedIn()}
                    </ul>
                </div>
            </div>
        )
    }

    // else if(user.isAdmin === false) {
    //     return (
    //         <div className='navbar-container'>
    //             <div className='navbar'>
    //                 <ul className='navbar-list'>
    //                   <Link to='/about'>
    //                       <li className='navbar-li-link'>About</li>
    //                   </Link>
    //                   <Link to='/'>
    //                       <li className='navbar-li-link'>Menu</li>
    //                   </Link>
    //                   <Link to='/login'>
    //                       <li className='navbar-li-link'>Have an Account? login</li>
    //                   </Link>
    //                   <Link to='/signUp'>
    //                       <li className='navbar-li-link'>Sign Up</li>
    //                   </Link>
    //                   <Link to='/myProfile'>
    //                       <li className='navbar-li-link'>My Profile</li>
    //                   </Link>
    //                 </ul>
    //             </div>
    //         </div>
    //     )
    // }

    // else if(user.isAdmin) {
    //     return (
    //         <div className='navbar-container'>
    //             <div className='navbar'>
    //                 <ul className='navbar-list'>
    //                   <Link to='/about'>
    //                       <li className='navbar-li-link'>About</li>
    //                   </Link>
    //                   <Link to='/'>
    //                       <li className='navbar-li-link'>Menu</li>
    //                   </Link>
    //                   <Link to='/login'>
    //                       <li className='navbar-li-link'>Have an Account? login</li>
    //                   </Link>
    //                   <Link to='/signUp'>
    //                       <li className='navbar-li-link'>Sign Up</li>
    //                   </Link>
    //                   <Link to='/allOrders'>
    //                       <li className='navbar-li-link'>Orders</li>
    //                   </Link>
    //                   <Link to='/allUsers'>
    //                       <li className='navbar-li-link'>Users</li>
    //                   </Link>
    //                   <Link to='/CreateDish'>
    //                       <li className='navbar-li-link'>Create Dish</li>
    //                   </Link>
    //                 </ul>
    //             </div>
    //         </div>
    //     )
    // }
}
