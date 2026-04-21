const express = require('express');
const {
  submitVote,
  getResults,
  streamResults,
} = require('../controllers/vote-controller');

const router = express.Router();

// All vote routes are public (anonymous voting)
router.post('/:pollId', submitVote);
router.get('/:pollId/results', getResults);
router.get('/:pollId/stream', streamResults);

module.exports = router;
