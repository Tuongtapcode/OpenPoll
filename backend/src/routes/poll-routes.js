const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPoll,
  getMyPolls,
  getPollById,
  closePoll,
  deletePoll,
  createPollValidation,
} = require('../controllers/poll-controller');

const router = express.Router();

// Protected routes (require auth)
router.post('/', protect, createPollValidation, createPoll);
router.get('/', protect, getMyPolls);
router.patch('/:id/close', protect, closePoll);
router.delete('/:id', protect, deletePoll);

// Public routes
router.get('/:id', getPollById);

module.exports = router;
