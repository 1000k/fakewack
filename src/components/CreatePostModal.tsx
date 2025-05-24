"use client";
import { generateContent } from '@/lib/genai';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('投稿内容:', content);
    const response = await generateContent(content);
    console.log('生成されたコメント:', response);
    setContent('');
    onClose();
  };

  if (!isOpen || !isMounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 relative shadow-xl z-[1001] overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今なにしてる？"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="p-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
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
