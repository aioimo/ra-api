const mongoose = require('mongoose');

const GameStatus = Object.freeze({
  inProcess: 'IN PROCESS',
  completed: 'COMPLETED'
});

const gameSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [GameStatus.inProcess, GameStatus.completed],
    default: GameStatus.inProcess
  },
  numberPlayers: {
    type: Number,
    min: 3,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  host: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Game', gameSchema);
