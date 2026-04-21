'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPollsTrigger, closePollTrigger, deletePollTrigger } from '@/features/poll/store/poll-slice';
import PollCard from '@/features/poll/components/poll-card';
import StatsCard from '../components/stats-card';
import { PageLoader } from '@/components/ui/loading';
import { Plus, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { polls, loading } = useAppSelector((state) => state.poll);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    dispatch(fetchPollsTrigger());
  }, [dispatch, isAuthenticated, router]);

  const handleClose = (id: string) => {
    if (confirm('Bạn có chắc muốn đóng cuộc bình chọn này?')) {
      dispatch(closePollTrigger(id));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa cuộc bình chọn này? Hành động này không thể hoàn tác.')) {
      dispatch(deletePollTrigger(id));
    }
  };

  if (!isAuthenticated) return <PageLoader />;

  const totalVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);
  const activePolls = polls.filter((p) => p.status === 'active').length;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Xin chào, {user?.name?.split(' ').pop()} 👋
            </h1>
            <p className="text-gray-400 mt-1">Quản lý các cuộc bình chọn và theo dõi kết quả</p>
          </div>
          <Link
            href="/polls/create"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            <Plus size={18} />
            Tạo bình chọn mới
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Tổng bình chọn"
            value={polls.length}
            icon="polls"
            subtitle={`${activePolls} đang hoạt động`}
          />
          <StatsCard
            title="Tổng phiếu bầu"
            value={totalVotes}
            icon="votes"
            subtitle="trên tất cả bình chọn"
          />
          <StatsCard
            title="Đang hoạt động"
            value={activePolls}
            icon="active"
            subtitle="đang thu thập ý kiến"
          />
        </div>

        {/* Polls List */}
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Danh sách bình chọn</h2>
        </div>

        {loading && polls.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : polls.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 border border-white/5 rounded-2xl">
            <div className="p-4 rounded-2xl bg-white/5 inline-block mb-4">
              <BarChart3 size={32} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Chưa có bình chọn nào</h3>
            <p className="text-gray-400 mb-6">Tạo bình chọn đầu tiên và bắt đầu thu thập phiếu bầu!</p>
            <Link
              href="/polls/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-300"
            >
              <Plus size={16} />
              Tạo bình chọn đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {polls.map((poll) => (
              <PollCard
                key={poll._id}
                poll={poll}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
