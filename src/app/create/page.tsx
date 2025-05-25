import { redirect } from 'next/navigation';
import { createPost } from '@/lib/actions';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import CreatePostForm from './CreatePostForm';

export default function CreatePostPage() {
  async function handleCreatePost(formData: FormData) {
    'use server';

    const user = await auth();
    const content = formData.get('content')?.toString();
    const userId = user?.user?.id;

    if (!userId) {
      throw new Error('User is not authenticated');
    }
    if (!content) {
      throw new Error('Content is required');
    }

    const success = await createPost(content, userId);
    if (success) {
      revalidatePath('/');
      redirect('/');
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl ">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <CreatePostForm action={handleCreatePost} />
    </div>
  );
}
