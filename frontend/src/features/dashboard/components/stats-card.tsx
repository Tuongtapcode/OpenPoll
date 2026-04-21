'use client';

import React from 'react';
import { Vote, BarChart3, Plus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: 'polls' | 'votes' | 'active';
  subtitle?: string;
}

const iconMap = {
  polls: BarChart3,
  votes: Vote,
  active: Plus,
};

const colorMap = {
  polls: 'from-indigo-600 to-indigo-500',
  votes: 'from-purple-600 to-purple-500',
  active: 'from-emerald-600 to-emerald-500',
};

export default function StatsCard({ title, value, icon, subtitle }: StatsCardProps) {
  const Icon = iconMap[icon];
  const gradient = colorMap[icon];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-1 tabular-nums">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
