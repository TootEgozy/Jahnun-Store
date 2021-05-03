const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {

    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    app.get('/user', (req, res)=>{
        res.send("in user");
    })
     // Express serve up index.html file if it doesn't recognize route
     const path = require('path');
     app.get('*', (req, res) => {
        console.log(path.resolve(__dirname, './jahnun-client/public'));
        res.sendFile(path.resolve(__dirname, './jahnun-client/public', 'build', 'index.html'));
     });
   }

//   app.get('/', (req, res)=>{
//       res.send("hey");
//   })


//connect to db with mongoose
mongoose.connect('mongodb+srv://jahnun-user:jahnun-is-good@jahnun-store.rno5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connected")
}).catch((e)=>console.log({Error: e}));


app.use((req, res)=> {
    res
    .status(404)
    .send("Unknown request");
})

app.listen(process.env.PORT || port , () =>{
    console.log(`Server started on port ${port}`)
});
