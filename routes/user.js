const express = require('express');
const router = express.Router();

const UserModel = require('../models/userModel');

router.get('/', (req, res) => {
    UserModel.find()
      .then(resultats => {
        res.status(200).json(resultats);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

module.exports = router;