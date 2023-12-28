const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth')

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wpu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connect or not to database
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err);
})
db.once('connected', () => {
    console.log('Database connected');
})

//Middleware
app.use(express.json())

// Use Authentication Routes
app.use('/auth', authRoutes)

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})