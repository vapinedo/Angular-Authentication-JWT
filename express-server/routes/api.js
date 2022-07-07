const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const db = "mongodb+srv://valp:demo@cluster0.f9nfhzo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log('Error => ' + err);
    } else {
        console.log(`Successfully connected to database.`);
    }
})

router.get('/', (req, res) => {
    res.send('From API Routes');
});

router.post('/register', (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    user.save((error, itemCreated) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(itemCreated);
        }
    });
});

router.post('/login', (req, res) => {
    const userData = req.body;
    
    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    res.status(200).send(user);
                }
            }
        }
    });
});

module.exports = router;