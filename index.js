const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

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
const gamesRoute = require('./routes/games');

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/games', gamesRoute);

app.listen(PORT, () => console.log(`Server up and running on Port ${PORT}`));
