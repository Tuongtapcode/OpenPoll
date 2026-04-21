const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const ApiError = require('../utils/api-error');
const generateFingerprint = require('../utils/generate-fingerprint');
const sseManager = require('../services/sse-manager');
const { votesTotal } = require('../middleware/metrics');

/**
 * @desc    Submit a vote
 * @route   POST /api/votes/:pollId
 * @access  Public
 */
async function submitVote(req, res, next) {
  try {
    const { pollId } = req.params;
    const { optionIndex } = req.body;

    // Find the poll
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    if (poll.status === 'closed') {
      throw ApiError.badRequest('This poll is closed');
    }

    // Validate option index
    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= poll.options.length) {
      throw ApiError.badRequest('Invalid option');
    }

    // Generate voter fingerprint
    const voterFingerprint = generateFingerprint(req);

    // Check if already voted
    const existingVote = await Vote.findOne({ poll: pollId, voterFingerprint });
    if (existingVote) {
      throw ApiError.conflict('You have already voted on this poll');
    }

    // Save vote
    await Vote.create({
      poll: pollId,
      optionIndex,
      voterFingerprint,
    });

    // Update poll counts atomically
    const updatedPoll = await Poll.findByIdAndUpdate(
      pollId,
      {
        $inc: {
          totalVotes: 1,
          [`options.${optionIndex}.voteCount`]: 1,
        },
      },
      { new: true }
    ).lean();

    // Increment Prometheus counter
    votesTotal.inc();

    // Broadcast updated results via SSE to ALL connected clients
    sseManager.broadcast(pollId, {
      type: 'vote_update',
      poll: {
        id: updatedPoll._id,
        options: updatedPoll.options,
        totalVotes: updatedPoll.totalVotes,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Vote submitted successfully',
      data: {
        options: updatedPoll.options,
        totalVotes: updatedPoll.totalVotes,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get poll results
 * @route   GET /api/votes/:pollId/results
 * @access  Public
 */
async function getResults(req, res, next) {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId).lean();
    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    res.json({
      success: true,
      data: {
        options: poll.options,
        totalVotes: poll.totalVotes,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    SSE stream for real-time poll updates
 * @route   GET /api/votes/:pollId/stream
 * @access  Public
 */
async function streamResults(req, res, next) {
  try {
    const { pollId } = req.params;

    // Verify poll exists
    const poll = await Poll.findById(pollId).lean();
    if (!poll) {
      throw ApiError.notFound('Poll not found');
    }

    // Disable request timeout for SSE
    req.socket.setTimeout(0);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(true);

    // Set SSE headers using res.set() (compatible with Express middleware)
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    });
    res.status(200);

    // Flush headers immediately so the client can start receiving events
    res.flushHeaders();

    // Send initial data
    res.write(`data: ${JSON.stringify({
      type: 'initial',
      poll: {
        id: poll._id,
        title: poll.title,
        options: poll.options,
        totalVotes: poll.totalVotes,
        status: poll.status,
      },
    })}\n\n`);

    // Register client with SSE manager
    sseManager.addClient(pollId, res);

    // Send heartbeat every 15s to keep connection alive
    const heartbeat = setInterval(() => {
      try {
        res.write(`: heartbeat\n\n`);
      } catch {
        clearInterval(heartbeat);
      }
    }, 15000);

    // Clean up on disconnect
    req.on('close', () => {
      clearInterval(heartbeat);
      sseManager.removeClient(pollId, res);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitVote,
  getResults,
  streamResults,
};
