const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();

router.get('/', verify, (req, res) => {
  res.json({ posts: { title: 'My first post' } });
});

module.exports = router;
