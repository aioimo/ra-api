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
  player1: {
    type: mongoose.Schema.Types.ObjectId
  },
  player2: { type: mongoose.Schema.Types.ObjectId },
  player3: { type: mongoose.Schema.Types.ObjectId },
  player4: { type: mongoose.Schema.Types.ObjectId },
  player5: { type: mongoose.Schema.Types.ObjectId }
});

gameSchema.query.includesPlayer = function(user) {
  return this.where({
    $or: [
      { player1: user },
      { player2: user },
      { player3: user },
      { player4: user },
      { player5: user }
    ]
  });
};

module.exports = mongoose.model('Game', gameSchema);
