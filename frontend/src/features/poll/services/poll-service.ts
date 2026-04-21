import { authApi, publicApi } from '@/lib/axios';
import { ICreatePollPayload, IPoll } from '../types';
import { IApiResponse } from '@/types';

const pollService = {
  create: async (payload: ICreatePollPayload): Promise<{ poll: IPoll }> => {
    const res = await authApi.post<IApiResponse<{ poll: IPoll }>>('/polls', payload);
    return res.data.data;
  },

  getMyPolls: async (): Promise<{ polls: IPoll[]; count: number }> => {
    const res = await authApi.get<IApiResponse<{ polls: IPoll[]; count: number }>>('/polls');
    return res.data.data;
  },

  getById: async (id: string): Promise<{ poll: IPoll }> => {
    const res = await publicApi.get<IApiResponse<{ poll: IPoll }>>(`/polls/${id}`);
    return res.data.data;
  },

  close: async (id: string): Promise<{ poll: IPoll }> => {
    const res = await authApi.patch<IApiResponse<{ poll: IPoll }>>(`/polls/${id}/close`);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await authApi.delete(`/polls/${id}`);
  },
};

export default pollService;
