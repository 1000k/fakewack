'use client';
import { useActionState } from 'react';
import { LoadingSpinner } from '@/components/spinner';
import Link from 'next/link';

type Props = {
  action: (formData: FormData) => Promise<void>;
};

export default function CreatePostForm({ action }: Props) {
  const [, formAction, pending] = useActionState(async (_state, formData) => {
    await action(formData);
    return null;
  }, null);

  return (
    <form action={formAction}>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        name="content"
        placeholder="今日は何してた？"
        required
        disabled={pending}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending && <LoadingSpinner />}
        {pending ? 'Boasting...' : '投稿'}
      </button>
    </form>
  );
}
