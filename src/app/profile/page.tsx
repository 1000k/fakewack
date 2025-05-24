import Link from 'next/link';

const user = {
  username: 'username',
  displayName: 'ユーザー名',
  bio: '自己紹介文がここに入ります。趣味や好きなことなど、自己紹介を書いてみましょう！',
  followers: 128,
  following: 256,
  posts: 42,
};

export default function Profile() {
  const userPosts = [
    { 
      id: 1, 
      content: '今日の夕日がきれいでした🌅 #夕日 #写真',
      timeAgo: '2時間前',
      likes: 24,
      comments: 5,
    },
    { 
      id: 2, 
      content: '新しいカフェを見つけました！コーヒーがおいしいです☕ #カフェ巡り',
      timeAgo: '1日前',
      likes: 56,
      comments: 12,
    },
    { 
      id: 3, 
      content: '今日のランチ🍱 #お昼ごはん',
      timeAgo: '3日前',
      likes: 89,
      comments: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* プロフィール情報 */}
      <div className="bg-white pt-4 pb-6 border-b">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
              <span className="text-3xl text-gray-600 font-medium">{user.displayName.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.displayName}</h2>
              <p className="text-gray-500 mt-1">@{user.username}</p>
              <p className="mt-2 text-gray-800">{user.bio}</p>
              
              <div className="flex space-x-6 mt-4">
                <Link href="/following" className="hover:underline">
                  <span className="font-semibold">{user.following}</span> <span className="text-gray-500">フォロー中</span>
                </Link>
                <Link href="/followers" className="hover:underline">
                  <span className="font-semibold">{user.followers}</span> <span className="text-gray-500">フォロワー</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700">
              プロフィールを編集
            </button>
          </div>
        </div>
      </div>

      {/* タブ */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto flex">
          <button className="flex-1 py-4 text-center font-medium text-indigo-600 border-b-2 border-indigo-600">
            投稿
          </button>
          <button className="flex-1 py-4 text-center font-medium text-gray-500">
            いいね
          </button>
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="max-w-2xl mx-auto bg-white">
        {userPosts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-600 font-medium">{user.displayName.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{user.displayName}</span>
                  <span className="text-gray-500 text-sm">@{user.username}</span>
                  <span className="text-gray-500 text-sm">・{post.timeAgo}</span>
                </div>
                <p className="mt-1 text-gray-800">{post.content}</p>
                <div className="mt-2 flex space-x-4 text-gray-500">
                  <Link href={`/post/${post.id}`} className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments}</span>
                  </Link>
                  <button className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
