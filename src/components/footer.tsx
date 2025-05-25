'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreatePostModal from './CreatePostModal';
import { IconHome, IconPlus, IconProfile, IconSearch } from './icons';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('Footer rendered, isModalOpen:', isModalOpen);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Open modal button clicked');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-2xl mx-auto flex justify-between px-4">
        <Link
          href="/"
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <IconHome />
        </Link>
        <Link
          href="/search"
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <IconSearch />
        </Link>
        <button
          onClick={(e) => {
            console.log('Button clicked');
            openModal(e);
          }}
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <IconPlus />
        </button>
        {/* <Link
          href="/activity"
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <IconThumbDown />
        </Link> */}
        <Link
          href="/profile"
          className="p-4 text-indigo-600 hover:text-indigo-700"
        >
          <IconProfile />
        </Link>
      </div>
      {typeof window !== 'undefined' &&
        createPortal(
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={closeModal}
          />,
          document.body
        )}
    </nav>
  );
}
