'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

type Comment = {
  id: number;
  username: string;
  displayName: string;
  content: string;
  timeAgo: string;
  likes: number;
};

type Post = {
  id: number;
  username: string;
  displayName: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
};

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const postId = params.postId;

  // ダミーデータ
  const post: Post = {
    id: Number(postId),
    username: 'username',
    displayName: 'ユーザー名',
    content:
      'これは投稿の内容です。写真や動画を共有したり、テキストを投稿したりできます。',
    timeAgo: '2時間前',
    likes: 24,
    comments: 5,
  };

  const comments: Comment[] = [
    {
      id: 1,
      username: 'user1',
      displayName: 'ユーザー1',
      content: '素敵な投稿ですね！',
      timeAgo: '1時間前',
      likes: 3,
    },
    {
      id: 2,
      username: 'user2',
      displayName: 'ユーザー2',
      content: 'また遊びに来ます！',
      timeAgo: '30分前',
      likes: 1,
    },
  ];

  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // コメントを追加する処理を実装
      console.log('コメントを投稿:', commentText);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">投稿</h1>
          <div className="w-6"></div> {/* スペース確保のための空のdiv */}
        </div>
      </header>

      {/* 投稿内容 */}
      <div className="max-w-2xl mx-auto bg-white border-b">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <Link
              href={`/${post.username}`}
              className="flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {post.displayName.charAt(0)}
                </span>
              </div>
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

              {/* 画像がある場合の表示 */}
              {/* <div className="mt-3 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src="/sample-image.jpg" 
                  alt="Post content" 
                  className="w-full h-auto"
                />
              </div> */}

              <div className="mt-3 flex space-x-4 text-gray-500">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill={isLiked ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={isLiked ? 0 : 1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{likeCount}</span>
                </button>
                <button className="flex items-center space-x-1">
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* コメント一覧 */}
      <div className="max-w-2xl mx-auto bg-white divide-y">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4"
          >
            <div className="flex items-start space-x-3">
              <Link
                href={`/${comment.username}`}
                className="flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {comment.displayName.charAt(0)}
                  </span>
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/${comment.username}`}
                    className="font-medium hover:underline"
                  >
                    {comment.displayName}
                  </Link>
                  <span className="text-gray-500 text-sm">
                    @{comment.username}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ・{comment.timeAgo}
                  </span>
                </div>
                <p className="mt-1 text-gray-800">{comment.content}</p>
                <div className="mt-1 flex items-center space-x-4 text-gray-500 text-sm">
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* コメント入力フォーム */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <form
          onSubmit={handleCommentSubmit}
          className="max-w-2xl mx-auto flex items-center p-2"
        >
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="コメントを追加..."
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800"
            />
          </div>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`ml-2 px-4 py-2 rounded-full font-medium ${commentText.trim() ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            投稿
          </button>
        </form>
      </div>
    </div>
  );
}
