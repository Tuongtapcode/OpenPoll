'use client';

import React from 'react';
import Link from 'next/link';
import { Vote, Zap, BarChart3, Globe, Shield, Activity } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Kết quả thời gian thực',
    description: 'Xem phiếu bầu cập nhật trực tiếp qua Server-Sent Events. Không cần tải lại trang.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Bình chọn ẩn danh',
    description: 'Người bình chọn không cần đăng ký tài khoản. Chỉ cần chia sẻ link và bắt đầu thu thập ý kiến.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Biểu đồ đẹp mắt',
    description: 'Trực quan hóa kết quả với biểu đồ cột và biểu đồ tròn tương tác bằng Recharts.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Chống spam',
    description: 'Hệ thống fingerprint tích hợp ngăn chặn bình chọn trùng lặp từ cùng một người dùng.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Activity,
    title: 'Giám sát hệ thống',
    description: 'Tích hợp Prometheus metrics endpoint để hiển thị trên Grafana Dashboard.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Vote,
    title: 'Quản lý dễ dàng',
    description: 'Tạo, chia sẻ, đóng và xóa các cuộc bình chọn từ trang quản lý cá nhân.',
    gradient: 'from-rose-500 to-red-500',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nền tảng bình chọn thời gian thực
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-white">Tạo bình chọn.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nhận kết quả tức thì.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tạo cuộc bình chọn tương tác trong vài giây. Chia sẻ link và theo dõi
            phiếu bầu cập nhật thời gian thực với biểu đồ trực quan đẹp mắt.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
            >
              Bắt đầu miễn phí
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              Đăng nhập →
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16">
            {[
              { label: 'Thời gian thực', value: 'SSE' },
              { label: 'Mã nguồn', value: 'Mở' },
              { label: 'Giám sát', value: 'Sẵn sàng' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mọi thứ bạn cần cho{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                bình chọn tức thì
              </span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Xây dựng với công nghệ hiện đại. Thiết kế cho demo và sử dụng thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-gray-900/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-4`}
                >
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sẵn sàng tạo bình chọn đầu tiên?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Đăng ký trong vài giây và bắt đầu thu thập phản hồi thời gian thực từ khán giả của bạn.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
              >
                <Vote size={20} />
                Bắt đầu miễn phí
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
