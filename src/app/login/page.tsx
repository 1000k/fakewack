import { signIn } from '@/lib/auth';

export default function Login() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">ログイン</h1>

      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}
