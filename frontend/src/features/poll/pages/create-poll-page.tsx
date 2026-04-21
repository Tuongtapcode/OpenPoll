'use client';

import React from 'react';
import CreatePollForm from '../components/create-poll-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatePollPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Quay lại Bảng điều khiển
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Tạo bình chọn mới</h1>
          <p className="text-gray-400 mt-2">
            Thiết lập câu hỏi và các lựa chọn. Chia sẻ link và theo dõi phiếu bầu cập nhật thời gian thực!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <CreatePollForm />
        </div>
      </div>
    </div>
  );
}
