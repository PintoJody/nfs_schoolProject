const express = require('express');
const router = express.Router();

const ClassroomModel = require('../models/classroomModel');

router.get('/', async (req, res) => {
  try {
      const classrooms = await ClassroomModel.find()
          .populate('teacherId', '-password')
          .populate('studentId', '-password')
          .exec();
      res.status(200).json({ classrooms });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
  }
});

  router.post('/create', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        const newClassroom = new ClassroomModel({ name });
        const savedClassroom = await newClassroom.save();

        res.json({ classroom: savedClassroom });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la salle de classe' });
    }
});

router.put('/update/:id', async (req, res) => {
  const classroomId = req.params.id;
  const updates = req.body; 

  try {
      const updatedClassroom = await ClassroomModel.findOneAndUpdate(
          { _id: classroomId },
          { $set: updates },
          { new: true }
      );

      if (!updatedClassroom) {
          return res.status(404).json({ message: 'Salle de classe non trouvée' });
      }

      res.json({ classroom: updatedClassroom });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la salle de classe' });
  }
});

module.exports = router;