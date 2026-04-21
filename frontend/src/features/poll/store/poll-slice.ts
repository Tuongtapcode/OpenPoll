import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPollState, IPoll, ICreatePollPayload } from '../types';

const initialState: IPollState = {
  polls: [],
  currentPoll: null,
  loading: false,
  error: null,
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    // Create poll
    createPollTrigger(state, _action: PayloadAction<ICreatePollPayload>) {
      state.loading = true;
      state.error = null;
    },
    createPollSuccess(state, action: PayloadAction<IPoll>) {
      state.loading = false;
      state.polls.unshift(action.payload);
    },
    createPollFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch my polls
    fetchPollsTrigger(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPollsSuccess(state, action: PayloadAction<IPoll[]>) {
      state.loading = false;
      state.polls = action.payload;
    },
    fetchPollsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch single poll
    fetchPollByIdTrigger(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchPollByIdSuccess(state, action: PayloadAction<IPoll>) {
      state.loading = false;
      state.currentPoll = action.payload;
    },
    fetchPollByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Close poll
    closePollTrigger(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    closePollSuccess(state, action: PayloadAction<IPoll>) {
      state.loading = false;
      const index = state.polls.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.polls[index] = action.payload;
      if (state.currentPoll?._id === action.payload._id) {
        state.currentPoll = action.payload;
      }
    },
    closePollFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete poll
    deletePollTrigger(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    deletePollSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.polls = state.polls.filter((p) => p._id !== action.payload);
    },
    deletePollFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear
    clearPollError(state) {
      state.error = null;
    },
    clearCurrentPoll(state) {
      state.currentPoll = null;
    },
  },
});

export const {
  createPollTrigger,
  createPollSuccess,
  createPollFailure,
  fetchPollsTrigger,
  fetchPollsSuccess,
  fetchPollsFailure,
  fetchPollByIdTrigger,
  fetchPollByIdSuccess,
  fetchPollByIdFailure,
  closePollTrigger,
  closePollSuccess,
  closePollFailure,
  deletePollTrigger,
  deletePollSuccess,
  deletePollFailure,
  clearPollError,
  clearCurrentPoll,
} = pollSlice.actions;

export default pollSlice.reducer;
