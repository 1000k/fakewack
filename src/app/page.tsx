
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ダミーデータ
type Post = {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
};

const posts: Post[] = [
  {
    id: 1,
    username: 'user1',
    displayName: 'ユーザー1',
    avatar: '/avatar1.jpg',
    content: '今日は1日中家でプログラミングをしていました！新しい機能を実装できて充実した1日でした✨ #プログラミング #エンジニア',
    timeAgo: '2時間前',
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    username: 'user2',
    displayName: 'ユーザー2',
    avatar: '/avatar2.jpg',
    content: 'カフェで集中コーディング中☕️ 新しいプロジェクト始動です！ #プログラミング #カフェ',
    timeAgo: '4時間前',
    likes: 15,
    comments: 3,
  },
  {
    id: 3,
    username: 'user3',
    displayName: 'ユーザー3',
    avatar: '/avatar3.jpg',
    content: '素晴らしい1日でした！',
    timeAgo: '1日前',
    likes: 89,
    comments: 7,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('following');
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">FakeWack</h1>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-medium">P</span>
            </Link>
          </div>
        </div>
      </header>

      {/* タブ */}
      <div className="max-w-2xl mx-auto bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'following' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          >
            フォロー中
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'recommended' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          >
            おすすめ
          </button>
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="max-w-2xl mx-auto bg-white">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="p-4 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="flex items-start space-x-3">
              <Link 
                href={`/${post.username}`} 
                className="flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{post.displayName.charAt(0)}</span>
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/${post.username}`} 
                    className="font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.displayName}
                  </Link>
                  <span className="text-gray-500 text-sm">@{post.username}</span>
                  <span className="text-gray-500 text-sm">・{post.timeAgo}</span>
                </div>
                <p className="mt-1 text-gray-800">{post.content}</p>
                <div className="mt-2 flex space-x-4 text-gray-500">
                  <div 
                    className="flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // いいねの処理を実装
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div 
                    className="flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* フッターナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <Link href="/" className="p-2 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <Link href="/search" className="p-2 text-gray-700 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
        <Link href="/create" className="p-2 text-gray-700 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
        <Link href="/activity" className="p-2 text-gray-700 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>
        <Link href="/profile" className="p-2 text-gray-700 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}
