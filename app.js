//EXPRESS
const express = require('express'); 
const app = express(); 
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Connection to mongoDB
require('./config/db/connect');

//CORS
const cors = require('cors'); 
app.use(cors()); 

const bodyParser = require('body-parser'); 
const classroomRoute = require('./routes/classroom');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

// Middleware express-jwt
app.use((req, res, next) => {
    if (req.path === '/auth/login' || req.path === '/auth/register') {
        return next();
    }

    // Vérif jwt
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Non autorisé' });
    }

    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Non autorisé' });
        } else {
            req.user = decoded;
            next();
        }
    });
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/classroom', classroomRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);


app.listen(3000, () => {
    console.log("Serveur is running port 3000 !");
})