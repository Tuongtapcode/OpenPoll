'use client';

import React from 'react';
import Link from 'next/link';
import { IPoll } from '../types';
import Badge from '@/components/ui/badge';
import { BarChart3, Users, Clock, ExternalLink } from 'lucide-react';

interface PollCardProps {
  poll: IPoll;
  onClose?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export default function PollCard({ poll, onClose, onDelete, showActions = true }: PollCardProps) {
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/polls/${poll._id}` 
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-gray-900/70 transition-all duration-300">
      {/* Status badge */}
      <div className="flex items-start justify-between mb-4">
        <Badge variant={poll.status === 'active' ? 'success' : 'neutral'}>
          {poll.status === 'active' ? '● Đang mở' : '○ Đã đóng'}
        </Badge>
        <span className="text-xs text-gray-500">
          {new Date(poll.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>

      {/* Title */}
      <Link href={`/polls/${poll._id}`}>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {poll.title}
        </h3>
      </Link>

      {poll.description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{poll.description}</p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <Users size={14} />
          <span>{poll.totalVotes} phiếu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart3 size={14} />
          <span>{poll.options.length} lựa chọn</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>{formatTimeAgo(poll.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
          <Link
            href={`/polls/${poll._id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
          >
            <ExternalLink size={14} />
            Xem
          </Link>
          <button
            onClick={handleCopyLink}
            className="flex-1 px-3 py-2 rounded-xl text-sm font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all cursor-pointer"
          >
            Sao chép link
          </button>
          {poll.status === 'active' && onClose && (
            <button
              onClick={() => onClose(poll._id)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              Đóng
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(poll._id)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}
