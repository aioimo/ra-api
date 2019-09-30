const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB')
);

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Server up and running on Port ${PORT}`));
