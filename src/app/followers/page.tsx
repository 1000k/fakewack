'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

type User = {
  id: number;
  username: string;
  displayName: string;
  bio: string;
  isFollowing: boolean;
};

export default function Followers() {
  const router = useRouter();
  
  // ダミーデータ
  const followers: User[] = [
    {
      id: 1,
      username: 'user1',
      displayName: 'ユーザー1',
      bio: 'プログラミングが好きです',
      isFollowing: true,
    },
    {
      id: 2,
      username: 'user2',
      displayName: 'ユーザー2',
      bio: '写真を撮るのが趣味です',
      isFollowing: false,
    },
    {
      id: 3,
      username: 'user3',
      displayName: 'ユーザー3',
      bio: '旅行が好きです',
      isFollowing: true,
    },
  ];

  const handleFollow = (userId: number) => {
    // フォロー/アンフォローの処理を実装
    console.log(`Follow/Unfollow user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.back()}
            className="p-1 rounded-full hover:bg-gray-100 mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">フォロワー</h1>
            <p className="text-sm text-gray-500">@{'username'}さんをフォローしています</p>
          </div>
        </div>
      </header>

      {/* フォロワー一覧 */}
      <div className="max-w-2xl mx-auto bg-white divide-y">
        {followers.map((user) => (
          <div key={user.id} className="p-4 flex items-center justify-between">
            <Link href={`/${user.username}`} className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                <span className="text-xl text-gray-600 font-medium">{user.displayName.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{user.displayName}</h3>
                <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                <p className="text-sm text-gray-600 mt-1 truncate">{user.bio}</p>
              </div>
            </Link>
            <button
              onClick={() => handleFollow(user.id)}
              className={`ml-4 px-4 py-1.5 rounded-full text-sm font-medium ${user.isFollowing ? 'bg-white text-gray-800 border border-gray-300' : 'bg-black text-white'}`}
            >
              {user.isFollowing ? 'フォロー中' : 'フォローする'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
