
import Link from 'next/link';
import { IconComment, IconDummyUser, IconLike } from '@/components/icons';
import prisma from '@/lib/prisma';
import { formatWithLineBreaks } from '@/lib/utils';

// 相対時間を日本語で表示する関数
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'たった今';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}時間前`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}日前`;
};

// ユーザーフィード
export default async function Home() {
  // データベースから投稿を取得
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // コメント数は現状ダミーデータ（必要に応じて実装）
  const commentCounts: Record<number, number> = {};
  posts.forEach(post => {
    commentCounts[post.id] = Math.floor(Math.random() * 10); // 0-9のランダムなコメント数
  });
  return (
    <main className="min-h-screen bg-gray-100">

      {/* 投稿一覧 */}
      <div className="max-w-2xl mx-auto bg-white">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="p-4 border-b hover:bg-gray-50"
          >
            <div className="flex items-start space-x-3">
              <Link 
                href={`/${post.user.username}`} 
                className="flex-shrink-0"
              >
                <IconDummyUser name={post.user.displayName} />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/${post.user.username}`} 
                    className="font-medium hover:underline"
                  >
                    {post.user.displayName}
                  </Link>
                  <span className="text-gray-500 text-sm">@{post.user.username}</span>
                  <span className="text-gray-500 text-sm">・{formatTimeAgo(new Date(post.createdAt))}</span>
                </div>
                <p className="mt-1 text-gray-800">
                  {formatWithLineBreaks(post.content)}
                </p>
                <div className="mt-2 flex space-x-4 text-gray-500">
                  <Link 
                    href={`/post/${post.id}`}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                  >
                    <IconLike />
                    <span>{post.likes}</span>
                  </Link>
                  <Link 
                    href={`/post/${post.id}#comments`}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                  >
                    <IconComment />
                    <span>{commentCounts[post.id] || 0}</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

    </main>
  );
}
