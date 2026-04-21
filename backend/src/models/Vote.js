const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },
    optionIndex: {
      type: Number,
      required: [true, 'Option index is required'],
    },
    voterFingerprint: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Each voter can only vote once per poll
voteSchema.index({ poll: 1, voterFingerprint: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
