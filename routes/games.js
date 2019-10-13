const express = require('express');
const verify = require('./verifyToken');
const Game = require('../models/Game');
const router = express.Router();

// GET all games
router.get('/', verify, async (req, res) => {
  try {
    games = await Game.find();
    res.json({ data: games });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new Game
router.post('/', verify, async (req, res) => {
  const { numberPlayers } = req.body;
  const game = new Game({
    numberPlayers,
    host: req.user
  });

  try {
    const savedGame = await game.save();
    res.json({ message: `${savedGame.id} created`, game: savedGame });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
