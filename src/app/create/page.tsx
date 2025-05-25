import { redirect } from 'next/navigation';
import { createPost } from '@/lib/actions';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export default function CreatePostPage() {
  // Create Post
  async function handleCreatePost(formData: FormData) {
    'use server';

    // Get the user from the auth session
    const user = await auth();
    const content = formData.get('content')?.toString();
    const userId = user?.user?.id;

    console.log(user);
    // If no user, redirect to login
    if (!userId) {
      redirect('/login');
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
      <form action={handleCreatePost}>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          name="content"
          placeholder="Post Content"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
