const { validationResult, body } = require('express-validator');
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const ApiError = require('../utils/api-error');

/**
 * Validation rules
 */
const createPollValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3, max: 200 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('options')
    .isArray({ min: 2, max: 10 })
    .withMessage('A poll must have between 2 and 10 options'),
  body('options.*.text').trim().notEmpty().withMessage('Option text is required'),
];

/**
 * @desc    Create a new poll
 * @route   POST /api/polls
 * @access  Private
 */
async function createPoll(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.badRequest(errors.array()[0].msg);
    }

    const { title, description, options } = req.body;

    const poll = await Poll.create({
      title,
      description,
      options: options.map((opt) => ({ text: opt.text, voteCount: 0 })),
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: { poll },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get current user's polls
 * @route   GET /api/polls
 * @access  Private
 */
async function getMyPolls(req, res, next) {
  try {
    const polls = await Poll.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: { polls, count: polls.length },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get poll by ID (public)
 * @route   GET /api/polls/:id
 * @access  Public
 */
async function getPollById(req, res, next) {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate('owner', 'name')
      .lean();

    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    res.json({
      success: true,
      data: { poll },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Close a poll
 * @route   PATCH /api/polls/:id/close
 * @access  Private (owner only)
 */
async function closePoll(req, res, next) {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    if (poll.owner.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('Not authorized to close this poll');
    }

    if (poll.status === 'closed') {
      throw ApiError.badRequest('Poll is already closed');
    }

    poll.status = 'closed';
    await poll.save();

    res.json({
      success: true,
      data: { poll },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Delete a poll
 * @route   DELETE /api/polls/:id
 * @access  Private (owner only)
 */
async function deletePoll(req, res, next) {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    if (poll.owner.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('Not authorized to delete this poll');
    }

    // Delete associated votes
    await Vote.deleteMany({ poll: poll._id });

    // Delete the poll
    await Poll.findByIdAndDelete(poll._id);

    res.json({
      success: true,
      message: 'Poll deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPoll,
  getMyPolls,
  getPollById,
  closePoll,
  deletePoll,
  createPollValidation,
};
