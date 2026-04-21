'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { createPollTrigger } from '../store/poll-slice';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { Plus, X, HelpCircle } from 'lucide-react';

export default function CreatePollForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.poll);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validOptions = options.filter((opt) => opt.trim() !== '');
    if (validOptions.length < 2) return;

    dispatch(createPollTrigger({
      title,
      description,
      options: validOptions.map((text) => ({ text })),
    }));

    // Navigate after successful creation
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <Input
        label="Câu hỏi bình chọn"
        name="title"
        placeholder="Bạn muốn hỏi điều gì?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        icon={<HelpCircle size={18} />}
        required
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Mô tả (tùy chọn)
        </label>
        <textarea
          placeholder="Thêm ngữ cảnh cho cuộc bình chọn của bạn..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 resize-none h-24"
          maxLength={1000}
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Các lựa chọn ({options.length}/10)
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 text-indigo-400 text-sm font-bold shrink-0">
                {index + 1}
              </div>
              <input
                type="text"
                placeholder={`Lựa chọn ${index + 1}`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 10 && (
          <button
            type="button"
            onClick={addOption}
            className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-400 border border-dashed border-indigo-500/30 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all w-full justify-center cursor-pointer"
          >
            <Plus size={16} />
            Thêm lựa chọn
          </button>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" isLoading={loading} className="w-full" size="lg">
        Tạo bình chọn
      </Button>
    </form>
  );
}
