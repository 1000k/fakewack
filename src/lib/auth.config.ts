import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import prisma from '@/lib/prisma';

const providers: Provider[] = [Google];

// Dummy provider for E2E tests
// see: https://authjs.dev/guides/testing#credentials-provider-in-development
if (process.env.NODE_ENV === 'development') {
  providers.push(
    Credentials({
      id: 'password',
      name: 'Password',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials) => {
        if (credentials.password === 'password') {
          // Create dummy user if it doesn't exist
          const user = prisma.user.upsert({
            where: { email: 'bob@alice.com' },
            create: {
              email: 'bob@alice.com',
              name: 'Bob Alice',
              image:
                'https://avatars.githubusercontent.com/u/67470890?s=200&v=4',
            },
            update: {},
          });
          return user;
        }
        return null;
      },
    }),
  );
}

// Notice this is only an object, not a full Auth.js instance
export default {
  providers,
} satisfies NextAuthConfig;
