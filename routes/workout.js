const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');

router.post('/addWorkout', workoutController.addWorkout);
router.get('/getMyWorkouts', workoutController.getMyWorkouts);
router.put('/updateWorkout/:id', workoutController.updateWorkout);
router.delete('/deleteWorkout/:id', workoutController.deleteWorkout);
router.put('/completeWorkoutStatus/:id', workoutController.completeWorkoutStatus);

module.exports = router;