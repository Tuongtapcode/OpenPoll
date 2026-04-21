import { publicApi } from '@/lib/axios';
import { IVotePayload, IVoteResult } from '../types';
import { IApiResponse } from '@/types';

const voteService = {
  submitVote: async (payload: IVotePayload): Promise<IVoteResult> => {
    const res = await publicApi.post<IApiResponse<IVoteResult>>(
      `/votes/${payload.pollId}`,
      { optionIndex: payload.optionIndex }
    );
    return res.data.data;
  },

  getResults: async (pollId: string): Promise<IVoteResult> => {
    const res = await publicApi.get<IApiResponse<IVoteResult>>(`/votes/${pollId}/results`);
    return res.data.data;
  },

  getStreamUrl: (pollId: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    return `${baseUrl}/votes/${pollId}/stream`;
  },
};

export default voteService;
