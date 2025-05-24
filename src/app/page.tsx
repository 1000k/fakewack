
import Link from 'next/link';
import { IconComment, IconDummyUser, IconLike } from '@/components/icons';

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
                href={`/${post.username}`} 
                className="flex-shrink-0"
              >
                <IconDummyUser name={post.displayName} />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/${post.username}`} 
                    className="font-medium hover:underline"
                  >
                    {post.displayName}
                  </Link>
                  <span className="text-gray-500 text-sm">@{post.username}</span>
                  <span className="text-gray-500 text-sm">・{post.timeAgo}</span>
                </div>
                <p className="mt-1 text-gray-800">{post.content}</p>
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
                    <span>{post.comments}</span>
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
