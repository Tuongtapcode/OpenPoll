'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { updateRealtimeResults, setResults } from '../store/vote-slice';
import { ISSEData } from '../types';
import voteService from '../services/vote-service';

/**
 * Hook to manage SSE connection for real-time poll updates.
 * Handles auto-reconnect on connection loss.
 */
export function usePollSSE(pollId: string | null) {
  const dispatch = useAppDispatch();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollIdRef = useRef(pollId);

  // Keep pollId ref current without re-creating callbacks
  useEffect(() => {
    pollIdRef.current = pollId;
  }, [pollId]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    const currentPollId = pollIdRef.current;
    if (!currentPollId) return;

    // Close existing connection first
    disconnect();

    const url = voteService.getStreamUrl(currentPollId);
    console.log('[SSE] Connecting to:', url);

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('[SSE] Connection opened for poll:', currentPollId);
    };

    eventSource.onmessage = (event) => {
      try {
        const data: ISSEData = JSON.parse(event.data);
        console.log('[SSE] Received:', data.type);

        if (data.type === 'initial') {
          dispatch(setResults({
            options: data.poll.options,
            totalVotes: data.poll.totalVotes,
          }));
        } else if (data.type === 'vote_update') {
          dispatch(updateRealtimeResults({
            options: data.poll.options,
            totalVotes: data.poll.totalVotes,
          }));
        }
      } catch (error) {
        console.error('[SSE] Error parsing message:', error);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('[SSE] Connection error, will reconnect...', err);
      eventSource.close();
      eventSourceRef.current = null;

      // Auto reconnect after 2 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        if (pollIdRef.current) {
          console.log('[SSE] Reconnecting...');
          connect();
        }
      }, 2000);
    };
  }, [dispatch, disconnect]);

  useEffect(() => {
    if (pollId) {
      connect();
    }
    return () => {
      disconnect();
    };
    // Only connect/disconnect when pollId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollId]);

  return { disconnect, reconnect: connect };
}
