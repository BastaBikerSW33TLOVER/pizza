require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const orderRoutes = require('./routes/orders');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Debugging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Pizza';

mongoose
    .connect(MONGODB_URI) // Deprecated options removed
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = app;
