'use client';
import { useActionState } from 'react';

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
        placeholder="Post Content"
        required
        disabled={pending}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending ? 'Boasting...' : 'Create Post'}
      </button>
    </form>
  );
}
