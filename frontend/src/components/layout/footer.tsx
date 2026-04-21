import React from 'react';
import { Vote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
              <Vote size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-400">OpenPoll</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} OpenPoll. Xây dựng cho học tập & giám sát hệ thống.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
