const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const MONGODB_URI = 'mongodb://localhost:27017/pizza';

  mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));



  
// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('working na ang kupal');

});













//MONGODB_URI=mongodb://localhost/pizza