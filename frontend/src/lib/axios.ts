import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Get or create a unique voter ID for this browser.
 * Stored in localStorage so each browser profile gets a unique ID.
 */
function getVoterId(): string {
  if (typeof window === 'undefined') return '';
  
  let voterId = localStorage.getItem('openpoll_voter_id');
  if (!voterId) {
    voterId = uuidv4();
    localStorage.setItem('openpoll_voter_id', voterId);
  }
  return voterId;
}

/**
 * Public API instance - no auth required
 */
export const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach voter ID to every public request (for anonymous vote tracking)
publicApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers['X-Voter-Id'] = getVoterId();
  }
  return config;
});

/**
 * Authenticated API instance - attaches JWT token
 */
export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
authApi.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('openpoll_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('openpoll_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
