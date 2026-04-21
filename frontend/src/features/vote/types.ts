// Feature: Vote - Types

import { IOption } from '@/features/poll/types';

export interface IVotePayload {
  pollId: string;
  optionIndex: number;
}

export interface IVoteResult {
  options: IOption[];
  totalVotes: number;
}

export interface ISSEData {
  type: 'initial' | 'vote_update';
  poll: {
    id: string;
    title?: string;
    options: IOption[];
    totalVotes: number;
    status?: string;
  };
}

export interface IVoteState {
  results: IVoteResult | null;
  hasVoted: boolean;
  loading: boolean;
  error: string | null;
}
