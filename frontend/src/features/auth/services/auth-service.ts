import { publicApi, authApi } from '@/lib/axios';
import { ILoginPayload, IRegisterPayload, IAuthResponse } from '../types';
import { IApiResponse } from '@/types';

const authService = {
  login: async (payload: ILoginPayload): Promise<IAuthResponse> => {
    const res = await publicApi.post<IApiResponse<IAuthResponse>>('/auth/login', payload);
    return res.data.data;
  },

  register: async (payload: IRegisterPayload): Promise<IAuthResponse> => {
    const res = await publicApi.post<IApiResponse<IAuthResponse>>('/auth/register', payload);
    return res.data.data;
  },

  getMe: async (): Promise<{ user: IAuthResponse['user'] }> => {
    const res = await authApi.get<IApiResponse<{ user: IAuthResponse['user'] }>>('/auth/me');
    return res.data.data;
  },
};

export default authService;
