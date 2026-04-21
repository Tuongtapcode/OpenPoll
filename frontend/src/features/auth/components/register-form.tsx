'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { registerTrigger, clearError } from '../store/auth-slice';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (form.password !== form.confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (form.password.length < 6) {
      setLocalError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    dispatch(registerTrigger({
      name: form.name,
      email: form.email,
      password: form.password,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(clearError());
    if (localError) setLocalError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {displayError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {displayError}
        </div>
      )}

      <Input
        label="Họ và tên"
        name="name"
        type="text"
        placeholder="Nguyễn Văn A"
        value={form.name}
        onChange={handleChange}
        icon={<User size={18} />}
        required
      />

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

      <Input
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={handleChange}
        icon={<Lock size={18} />}
        required
      />

      <Button type="submit" isLoading={loading} className="w-full" size="lg">
        Tạo tài khoản
      </Button>
    </form>
  );
}
