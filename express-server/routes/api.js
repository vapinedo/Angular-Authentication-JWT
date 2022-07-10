const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.model");

const db ="mongodb+srv://valp:demo@cluster0.f9nfhzo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log("Error => " + err);
  } else {
    console.log(`Successfully connected to database.`);
  }
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

router.get("/", (req, res) => {
  res.send("From API Routes");
});

router.post("/register", (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  user.save((error, itemCreated) => {
    if (error) {
      console.log(error);
    } else {
      const payload = { subject: itemCreated.id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  const userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid password");
        } else {
          let payload = { subject: user.id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.get("/events", (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "2",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "3",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "4",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "5",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "6",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "7",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "8",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
  ];
  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "2",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "3",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "4",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "5",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "6",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "7",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
    {
      _id: "8",
      name: "Auto Expo :: Special",
      description: "lorem ipsum",
      date: "Thu Jul 23 2022 18:02:54 GMT-0500",
    },
  ];
  res.json(events);
});

module.exports = router;
