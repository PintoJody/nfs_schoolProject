const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const userModel = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');


const app = express();
app.use(express.json());

router.post('/register', async (req, res) => {
    const errors = {};

    // email verif
    req.body.email = req.body.email;
    if (!validator.isEmail(req.body.email)) {
        errors.email = "Format d'email invalide.";
    }

    // username verif
    req.body.username = req.body.username;
    if (!validator.isAlphanumeric(req.body.username)) {
        errors.username = "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres.";
    }

    // Password verif
    if (!validator.isLength(req.body.password, { min: 6, max: undefined })) {
        errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors });
    } else {
        const hashPassword = await bcrypt.hash(req.body.password, 5);

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
    
        newUser.save()
        .then(docs => {
            res.send(docs);
            res.json({ message: 'Register Success !' });
        })
        .catch(err => {
            console.log('Error save : ' + err);
        });

        
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe valides." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
    }
});

module.exports = router;

