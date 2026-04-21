'use client';

import React from 'react';
import { IOption } from '@/features/poll/types';

interface OptionListProps {
  options: IOption[];
  totalVotes: number;
  selectedIndex: number | null;
  hasVoted: boolean;
  onSelect: (index: number) => void;
}

const COLORS = [
  'from-indigo-600 to-indigo-500',
  'from-purple-600 to-purple-500',
  'from-fuchsia-600 to-fuchsia-500',
  'from-pink-600 to-pink-500',
  'from-rose-600 to-rose-500',
  'from-red-600 to-red-500',
  'from-orange-600 to-orange-500',
  'from-amber-600 to-amber-500',
  'from-emerald-600 to-emerald-500',
  'from-cyan-600 to-cyan-500',
];

export default function OptionList({
  options,
  totalVotes,
  selectedIndex,
  hasVoted,
  onSelect,
}: OptionListProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
        const isSelected = selectedIndex === index;

        return (
          <button
            key={option._id || index}
            onClick={() => !hasVoted && onSelect(index)}
            disabled={hasVoted}
            className={`
              relative w-full text-left rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
              ${hasVoted ? 'cursor-default' : 'hover:scale-[1.01] active:scale-[0.99]'}
              ${isSelected
                ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-950'
                : 'hover:ring-1 hover:ring-white/20'
              }
            `}
          >
            {/* Background bar */}
            <div className="absolute inset-0 bg-gray-800/50 border border-white/5 rounded-xl" />
            
            {/* Progress fill */}
            {hasVoted && (
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${COLORS[index % COLORS.length]} opacity-20 rounded-xl transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            )}

            {/* Content */}
            <div className="relative flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                    ${isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-500'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-white font-medium">{option.text}</span>
              </div>

              {/* Vote count / percentage */}
              {hasVoted && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">{option.voteCount} phiếu</span>
                  <span className={`font-bold ${isSelected ? 'text-indigo-400' : 'text-gray-300'}`}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
