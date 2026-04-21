import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVoteState, IVotePayload, IVoteResult } from '../types';
import { IOption } from '@/features/poll/types';

const initialState: IVoteState = {
  results: null,
  hasVoted: false,
  loading: false,
  error: null,
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    // Submit vote
    submitVoteTrigger(state, _action: PayloadAction<IVotePayload>) {
      state.loading = true;
      state.error = null;
    },
    submitVoteSuccess(state, action: PayloadAction<IVoteResult>) {
      state.loading = false;
      // Create entirely new object to guarantee re-render
      state.results = {
        options: action.payload.options.map(opt => ({ ...opt })),
        totalVotes: action.payload.totalVotes,
      };
      state.hasVoted = true;
    },
    submitVoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      // If duplicate vote error, still mark as voted
      if (action.payload.toLowerCase().includes('already voted')) {
        state.hasVoted = true;
      }
    },

    // Update from SSE - create entirely new objects to force re-render
    updateRealtimeResults(state, action: PayloadAction<{ options: IOption[]; totalVotes: number }>) {
      state.results = {
        options: action.payload.options.map(opt => ({ ...opt })),
        totalVotes: action.payload.totalVotes,
      };
    },

    // Set initial results from SSE
    setResults(state, action: PayloadAction<IVoteResult>) {
      state.results = {
        options: action.payload.options.map(opt => ({ ...opt })),
        totalVotes: action.payload.totalVotes,
      };
    },

    // Reset
    resetVote(state) {
      state.results = null;
      state.hasVoted = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  submitVoteTrigger,
  submitVoteSuccess,
  submitVoteFailure,
  updateRealtimeResults,
  setResults,
  resetVote,
} = voteSlice.actions;

export default voteSlice.reducer;
