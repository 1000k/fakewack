import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import Post from '@/components/Post';

// ユーザーフィード
export default async function Home() {
  const session = await auth();
  console.log(session);

  // データベースから投稿を取得
  const posts = await prisma.post.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // コメント数は現状ダミーデータ（必要に応じて実装）
  const commentCounts: Record<number, number> = {};
  posts.forEach((post) => {
    commentCounts[post.id] = Math.floor(Math.random() * 10); // 0-9のランダムなコメント数
  });

  console.log('posts: ', posts);
  return (
    <main className="bg-gray-100 w-full">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 m-12">
          <p>投稿がありません</p>
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            commentCounts={commentCounts}
          />
        ))
      )}
    </main>
  );
}
