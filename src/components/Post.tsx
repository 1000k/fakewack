import { formatWithLineBreaks } from '@/lib/utils';
import { formatTimeAgo } from '@/lib/utils';
import { IconDummyUser } from '@/components/icons';
import { IconLike } from '@/components/icons';
import { IconComment } from '@/components/icons';
import { Post as PostType } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

export default function Post({
  post,
  commentCounts,
}: {
  post: PostType & { user: { name: string | null } };
  commentCounts: Record<number, number>;
}) {
  return (
    <article
      key={post.id}
      className="p-4 border-b hover:bg-gray-50"
    >
      <div className="flex items-start space-x-3">
        <Link
          href={`/${post.user.name}`}
          className="flex-shrink-0"
        >
          <IconDummyUser name={post.user.name || ''} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Link
              href={`/${post.user.name}`}
              className="font-medium hover:underline"
            >
              {post.user.name}
            </Link>
            <span className="text-gray-500 text-sm">@{post.user.name}</span>
            <span className="text-gray-500 text-sm">
              ・{formatTimeAgo(new Date(post.createdAt))}
            </span>
          </div>

          {post.image && (
            <div className="flex items-center space-x-2">
              <Image
                src={post.image}
                alt="sample"
                width={512}
                height={512}
              />
            </div>
          )}

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
  );
}
