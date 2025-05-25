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
      <CreatePostForm action={handleCreatePost} />
    </div>
  );
}
