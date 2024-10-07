const Workout = require("../models/Workout");
const auth = require('../auth');

module.exports.addWorkout = (req, res) => {
    let newWorkout = new Workout({
        name: req.body.name,
        duration: req.body.duration,
        userId: req.user.id
    });

    newWorkout.save()
        .then(savedWorkout => res.status(201).send(savedWorkout))
        .catch(saveErr => {
            console.error("Error in saving the workout: ", saveErr);
            return res.status(500).send({ error: 'Failed to save the workout.' });
        });
};

module.exports.getMyWorkouts = (req, res) => {
    Workout.find({ userId: req.user.id })
        .then(workouts => {
            if (workouts.length > 0) {
                return res.status(200).send({ workouts });
            } else {
                return res.status(200).send({ message: 'No workouts found.' });
            }
        })
        .catch(err => res.status(500).send({ error: 'Error finding workouts.' }));
};

module.exports.updateWorkout = (req, res) => {
    let workoutUpdates = {
        name: req.body.name,
        duration: req.body.duration
    };

    return Workout.findByIdAndUpdate(
        req.params.id,
        workoutUpdates,
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ error: 'Workout not found.' });
        }

        return res.status(200).send({
            message: 'Workout updated successfully',
            updatedWorkout: updatedWorkout
        });
    })
    .catch(err => {
        console.error("Error in updating the workout: ", err);
        return res.status(500).send({ error: 'Error updating the workout.' });
    });
};

module.exports.deleteWorkout = (req, res) => {
    return Workout.deleteOne({ _id: req.params.id, userId: req.user.id })
        .then(deletedResult => {
            if (deletedResult.deletedCount < 1) {
                return res.status(404).send({ error: 'Workout not found.' });
            }

            return res.status(200).send({
                message: 'Workout deleted successfully.'
            });
        })
        .catch(err => {
            console.error("Error in deleting the workout: ", err);
            return res.status(500).send({ error: 'Error deleting the workout.' });
        });
};

module.exports.completeWorkoutStatus = (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { status: 'complete' },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ error: 'Workout not found.' });
        }

        return res.status(200).send({
            message: 'Workout marked as complete',
            updatedWorkout: updatedWorkout
        });
    })
    .catch(err => {
        console.error("Error in updating workout status: ", err);
        return res.status(500).send({ error: 'Error updating workout status.' });
    });
};
