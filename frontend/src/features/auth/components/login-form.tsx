'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginTrigger, clearError } from '../store/auth-slice';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginTrigger(form));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        icon={<Mail size={18} />}
        required
      />

      <Input
        label="Mật khẩu"
        name="password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        icon={<Lock size={18} />}
        required
      />

      <Button type="submit" isLoading={loading} className="w-full" size="lg">
        Đăng nhập
      </Button>
    </form>
  );
}
