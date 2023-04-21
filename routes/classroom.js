const express = require('express');
const router = express.Router();

const ClassroomModel = require('../models/classroomModel');

router.get('/', (req, res) => {
    ClassroomModel.find()
      .then(resultats => {
        res.status(200).json(resultats);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

module.exports = router;