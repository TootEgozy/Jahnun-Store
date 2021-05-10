const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


    //routes for all database actions
    app.use('/api', require('./routes'));
    //app.use('/api', require('./routes'));

    //making the image_uploads folder public
    //get the image on browser: http://localhost:8000/image_uploads/{file name}
    app.use('/image_uploads',express.static('image_uploads'));



if (process.env.NODE_ENV === 'production') {

    // Exprees will serve up production assets
    app.use(express.static('jahnun-client/build'));

     // Express serve up index.html file if it doesn't recognize route
     const path = require('path');
     app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'jahnun-client', 'build', 'index.html'));
     });
   }

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
