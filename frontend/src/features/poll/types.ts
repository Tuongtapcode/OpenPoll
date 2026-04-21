// Feature: Poll - Types

import { IBaseEntity } from '@/types';

export interface IOption {
  _id: string;
  text: string;
  voteCount: number;
}

export interface IPoll extends IBaseEntity {
  title: string;
  description: string;
  options: IOption[];
  owner: {
    _id: string;
    name: string;
  };
  status: 'active' | 'closed';
  totalVotes: number;
}

export interface ICreatePollPayload {
  title: string;
  description?: string;
  options: { text: string }[];
}

export interface IPollState {
  polls: IPoll[];
  currentPoll: IPoll | null;
  loading: boolean;
  error: string | null;
}
