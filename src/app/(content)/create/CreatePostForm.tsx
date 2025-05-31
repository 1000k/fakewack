'use client';
import { useActionState } from 'react';
import { LoadingSpinner } from '@/components/spinner';

type Props = {
  action: (formData: FormData) => Promise<void>;
};

export default function CreatePostForm({ action }: Props) {
  const [, formAction, pending] = useActionState(
    async (_state: unknown, formData: FormData) => {
      await action(formData);
      return null;
    },
    null,
  );

  return (
    <form action={formAction}>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        name="content"
        placeholder="今日は何してた？"
        required
        disabled={pending}
      ></textarea>

      {pending ? (
        <button
          disabled
          type="submit"
          className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <LoadingSpinner />
          Boasting...
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          投稿
        </button>
      )}
    </form>
  );
}
