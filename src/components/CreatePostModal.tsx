"use client";

import { useState, useEffect } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  console.log('Modal rendering, isOpen:', isOpen, 'isMounted:', isMounted);

  useEffect(() => {
    console.log('Modal mounted, isOpen:', isOpen);
    setIsMounted(true);
    return () => {
      console.log('Modal unmounting');
      setIsMounted(false);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここに投稿処理を追加
    console.log('投稿内容:', content);
    setContent('');
    onClose();
  };

  if (!isOpen || !isMounted) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative shadow-xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 className="text-xl font-bold mb-4">新規投稿</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今なにしてる？"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={6}
              required
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={!content.trim()}
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
