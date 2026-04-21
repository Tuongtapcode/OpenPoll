'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPollByIdTrigger } from '@/features/poll/store/poll-slice';
import { submitVoteTrigger, resetVote } from '../store/vote-slice';
import { usePollSSE } from '../hooks/use-poll-sse';
import OptionList from '../components/option-list';
import PollResultChart from '../components/poll-result-chart';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { PageLoader } from '@/components/ui/loading';
import { Users, BarChart3, Share2, CheckCircle, Eye } from 'lucide-react';

interface VotingPageProps {
  pollId: string;
}

export default function VotingPage({ pollId }: VotingPageProps) {
  const dispatch = useAppDispatch();
  const { currentPoll, loading: pollLoading } = useAppSelector((state) => state.poll);
  const { results, hasVoted, loading: voteLoading, error: voteError } = useAppSelector((state) => state.vote);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [copied, setCopied] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch poll data
  useEffect(() => {
    dispatch(fetchPollByIdTrigger(pollId));
    return () => {
      dispatch(resetVote());
    };
  }, [dispatch, pollId]);

  // Connect SSE for real-time updates
  usePollSSE(pollId);

  const handleVote = () => {
    if (selectedIndex === null) return;
    dispatch(submitVoteTrigger({ pollId, optionIndex: selectedIndex }));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (pollLoading && !currentPoll) return <PageLoader />;

  if (!currentPoll) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Không tìm thấy bình chọn</h2>
          <p className="text-gray-400">Bình chọn này có thể đã bị xóa.</p>
        </div>
      </div>
    );
  }

  // Use SSE results if available, fallback to poll data
  const displayOptions = results?.options || currentPoll.options;
  const displayTotalVotes = results?.totalVotes ?? currentPoll.totalVotes;
  const shouldShowResults = hasVoted || showResults || currentPoll.status === 'closed';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={currentPoll.status === 'active' ? 'success' : 'neutral'}>
              {currentPoll.status === 'active' ? '● Đang mở' : '○ Đã đóng'}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <Users size={14} />
              <span className="tabular-nums font-medium">{displayTotalVotes} phiếu bầu</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {currentPoll.title}
          </h1>

          {currentPoll.description && (
            <p className="text-gray-400 mt-3 text-lg">{currentPoll.description}</p>
          )}

          {currentPoll.owner?.name && (
            <p className="text-sm text-gray-500 mt-2">
              bởi <span className="text-gray-400">{currentPoll.owner.name}</span>
            </p>
          )}
        </div>

        {/* Voting Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
          {/* Success message */}
          {hasVoted && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <CheckCircle size={20} className="text-emerald-400 shrink-0" />
              <p className="text-emerald-400 text-sm font-medium">
                Phiếu bầu của bạn đã được ghi nhận! Kết quả cập nhật thời gian thực.
              </p>
            </div>
          )}

          {/* Error */}
          {voteError && !hasVoted && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
              <p className="text-red-400 text-sm">{voteError}</p>
            </div>
          )}

          {/* Options */}
          <OptionList
            options={displayOptions}
            totalVotes={displayTotalVotes}
            selectedIndex={selectedIndex}
            hasVoted={shouldShowResults}
            onSelect={setSelectedIndex}
          />

          {/* Vote button */}
          {!hasVoted && currentPoll.status === 'active' && (
            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleVote}
                isLoading={voteLoading}
                disabled={selectedIndex === null}
                className="flex-1"
                size="lg"
              >
                Bình chọn
              </Button>
              {!showResults && (
                <Button
                  variant="ghost"
                  onClick={() => setShowResults(true)}
                  className="flex items-center gap-2"
                >
                  <Eye size={16} />
                  Xem kết quả
                </Button>
              )}
            </div>
          )}

          {currentPoll.status === 'closed' && !hasVoted && (
            <div className="mt-6 p-4 rounded-xl bg-gray-800/50 border border-white/5 text-center">
              <p className="text-gray-400">Cuộc bình chọn này đã đóng. Không thể bình chọn thêm.</p>
            </div>
          )}
        </div>

        {/* Charts - show when voted, viewing results, or poll closed */}
        {shouldShowResults && displayOptions.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 size={20} className="text-indigo-400" />
                Kết quả
              </h2>
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    chartType === 'bar'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Cột
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    chartType === 'pie'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Tròn
                </button>
              </div>
            </div>

            <PollResultChart
              options={displayOptions}
              totalVotes={displayTotalVotes}
              chartType={chartType}
            />
          </div>
        )}

        {/* Share */}
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={handleShare}
            className="inline-flex items-center gap-2"
          >
            <Share2 size={16} />
            {copied ? 'Đã sao chép!' : 'Chia sẻ bình chọn này'}
          </Button>
        </div>
      </div>
    </div>
  );
}
