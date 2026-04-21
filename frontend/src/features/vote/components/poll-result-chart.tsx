'use client';

import React from 'react';
import { IOption } from '@/features/poll/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

interface PollResultChartProps {
  options: IOption[];
  totalVotes: number;
  chartType?: 'bar' | 'pie';
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#f97316', '#eab308',
  '#22c55e', '#06b6d4',
];

export default function PollResultChart({
  options,
  totalVotes,
  chartType = 'bar',
}: PollResultChartProps) {
  const data = options.map((opt, i) => ({
    name: opt.text.length > 20 ? opt.text.substring(0, 20) + '...' : opt.text,
    fullName: opt.text,
    votes: opt.voteCount,
    percentage: totalVotes > 0 ? ((opt.voteCount / totalVotes) * 100).toFixed(1) : '0.0',
    fill: COLORS[i % COLORS.length],
  }));

  if (chartType === 'pie') {
    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="votes"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
              }}
              formatter={(value: number, _: any, props: any) => [
                `${value} votes (${props.payload.percentage}%)`,
                props.payload.fullName,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
          <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: '#d1d5db', fontSize: 13 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
            }}
            formatter={(value: number, _: any, props: any) => [
              `${value} votes (${props.payload.percentage}%)`,
              props.payload.fullName,
            ]}
          />
          <Bar
            dataKey="votes"
            radius={[0, 8, 8, 0]}
            animationBegin={0}
            animationDuration={600}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
