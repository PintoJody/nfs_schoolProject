//EXPRESS
const express = require('express'); 
const app = express(); 

//Connection to mongoDB
require('./config/db/connect');

//CORS
const cors = require('cors'); 
app.use(cors()); 


const bodyParser = require('body-parser'); 
const classroomRoute = require('./routes/classroom');
const userRoute = require('./routes/user');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/classroom', classroomRoute);
app.use('/user', userRoute);


app.listen(3000, () => {
    console.log("Serveur is running port 3000 !");
})