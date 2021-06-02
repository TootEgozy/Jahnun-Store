import './App.css';
import { React, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './components/Menu.page';
import Navbar from './components/Navbar';
import About from './components/About.page';
import AllOrders from './components/AllOrders.page';
import AllUsers from './components/AllUsers.page';
import Checkout from './components/Checkout.page';
import CreateDish from './components/CreateDish.page';
import Login from './components/Login.page';
import SignUp from './components/SignUp.page';
import MyProfile from './components/MyProfile.page';
import EditDish from './components/EditDish.page';
const axios = require('axios');

function App() {

 // User & token are supposed to be always present. If there is no user logged in, the app will login the 'guest' user.
  // Order is a temporary object that is used to collect data from all the relevant components and to create the order document in the database.

  //DishInEdit holds the dish that is currently in edit.

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [order, setOrder] = useState(null);

  const [dishInEdit, setDishInEdit] = useState(null);

  //shippment cities
  const cities = [{'Zichron Yaakov':25}, {'Binyamina-Givat-Ada':15}, {'Pardes-Hanna-Carkur':25}, {'Kazir':35}, {'Harish':35}];

  //On the first load of App:
  //Check if there are user & token in local storage. 
  //If so, set them to state. 
  //If not, do a login request to the user guest, and set the data to the local storage & state.
  useEffect(()=> {
      
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      (async()=>{
        await setUser(JSON.parse(storedUser));
        await setToken(JSON.parse(storedToken));
      })();
    }
    else {
        (async()=> {
          try {
            let payload = {email: 'guest@gmail.com', password: '123456'};

            let res = await axios.post('https://jahnun-store.herokuapp.com/api/user/login', payload);

            let data = res.data;

            await localStorage.setItem('user', JSON.stringify(data.user));
            await localStorage.setItem('token', JSON.stringify(data.token));

            await setUser(data.user); //made a change here, removed JSOn.Stringify
            await setToken(data.token);
          }
          catch(e) {
            console.log({'Error': e});
          }
        })();
    }
    },[]);

      if(!user) {
        return (
            <div className='loading-container'>
                <div className='loader'>Loading...</div>
            </div>

        );
    }
    else return (
      <div>
        <BrowserRouter>
        <Navbar user={user} token={token}/>
          <Switch>
          <Route path='/' exact component={Menu}>
            <Menu user={user} token={token} order={order} setOrder={setOrder} dishInEdit={dishInEdit} setDishInEdit={setDishInEdit} />
          </Route>
          <Route path='/about' exact component={About}>
            <About user={user} token={token}/>
          </Route>
          <Route path='/allOrders' exact component={AllOrders}>
            <AllOrders user={user} token={token}/>
          </Route>
          <Route path='/allUsers' exact component={AllUsers}>
            <AllUsers user={user} token={token}/>
          </Route>
          <Route path='/checkout' exact component={Checkout}>
            <Checkout user={user} token={token} order={order} setOrder={setOrder} cities={cities}/>
          </Route>
          <Route path='/createDish' exact component={CreateDish}>
            <CreateDish user={user} token={token}/>
          </Route>
          <Route path='/editDish' exact component={EditDish}>
            <EditDish user={user} token={token} dishInEdit={dishInEdit} setDishInEdit={setDishInEdit}/>
          </Route>
          <Route path='/login' exact component={Login}>
            <Login user={user} token={token} setUser={setUser} setToken={setToken}/>
          </Route>
          <Route path='/signUp' exact component={SignUp}>
            <SignUp user={user} token={token} setUser={setUser} setToken={setToken}
            />
          </Route>
          <Route path='/myProfile' exact component={MyProfile}>
            <MyProfile user={user} token={token} setUser={setUser} setToken={setToken}/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );
}

export default App;
