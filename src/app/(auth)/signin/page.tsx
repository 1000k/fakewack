import { signIn } from '@/lib/auth';
import { IconGoogle } from '@/components/icons';

export default function Login() {
  return (
    // 画面中央に配置
    <main className="flex justify-center items-center h-svh">
      <div className="flex flex-col items-center justify-center bg-slate-200 p-12 rounded-lg">
        <h1 className="text-2xl font-bold mb-8">fakewack</h1>
        <form
          action={async () => {
            'use server';
            await signIn('google', {
              redirectTo: '/',
            });
          }}
        >
          <button
            type="submit"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <IconGoogle />
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}
