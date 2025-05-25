import Link from 'next/link';
import { IconHome, IconPlus, IconProfile, IconSearch } from './icons';

export function FooterLink({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="p-4 text-gray-500 hover:text-indigo-600"
    >
      {icon}
    </Link>
  );
}

export default function Footer() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-2xl mx-auto flex justify-between px-4">
        <FooterLink
          href="/"
          icon={<IconHome />}
        />
        <FooterLink
          href="/search"
          icon={<IconSearch />}
        />
        <FooterLink
          href="/create"
          icon={<IconPlus />}
        />
        <FooterLink
          href="/profile"
          icon={<IconProfile />}
        />
      </div>
    </nav>
  );
}
