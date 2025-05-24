'use client';
import { createPost } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // テスト用にユーザーIDを1に設定（実際のアプリでは認証情報から取得）
      const userId = 1;
      const result = await createPost(content, userId);

      if (result.success) {
        setContent('');
        onClose();
        // ページをリフレッシュして新しい投稿を表示
        router.refresh();
      } else {
        alert('投稿に失敗しました: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('予期せぬエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
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
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 relative shadow-xl z-[1001] overflow-y-auto max-h-[90vh]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div
            className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}
          ></div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今なにしてる？"
              className="w-full p-4 border border-gray-500 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:outline-none"
              required
              autoFocus
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none "
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="p-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? '投稿中...' : '投稿する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
