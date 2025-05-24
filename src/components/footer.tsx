"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from 'react-dom';
import CreatePostModal from "./CreatePostModal";

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
        <Link href="/" className="p-4 text-gray-500 hover:text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        <Link
          href="/search"
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
        <button
          onClick={(e) => {
            console.log('Button clicked');
            openModal(e);
          }}
          className="p-4 text-gray-500 hover:text-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {/* <Link href="/activity" className="p-4 text-gray-500 hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Link> */}
        <Link
          href="/profile"
          className="p-4 text-indigo-600 hover:text-indigo-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Link>
      </div>
      {typeof window !== 'undefined' && createPortal(
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />,
        document.body
      )}
    </nav>
  );
}
