const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Route imports
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

// Applying routes
app.use("/register", userRoutes);
app.use("/login", userRoutes);
app.use("/addWorkout", workoutRoutes);
app.use("/getMyWorkouts", workoutRoutes);
app.use("/updateWorkout", workoutRoutes);
app.use("/deleteWorkout", workoutRoutes);
app.use("/completeWorkoutStatus", workoutRoutes);

// Server start
if (require.main === module) {
    app.listen(port, () => {
        console.log(`API is now online on port ${port}`);
    });
}

module.exports = app;
