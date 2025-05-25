import Link from 'next/link';
import { IconBell, IconDummyUser, IconUser } from './icons';
import { SignOut } from './sign-out';
import { auth } from '@/lib/auth';

export default async function Header() {
  const session = await auth();
  const authed = !!session?.user;
  const image = session?.user?.image;
  console.log(session);

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {authed ? session.user?.name : 'fakewack'}
        </h1>
        <div className="flex space-x-4">
          {authed && (
            <>
              <SignOut />
              <button className="p-2 rounded-full hover:bg-gray-100">
                <IconBell />
              </button>

              <Link
                href="/profile"
                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
              >
                {image ? (
                  <IconUser image={image} />
                ) : (
                  <IconDummyUser name="P" />
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
