'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-40 bg-gray-500 text-white p-4">
      <div className="mb-8">
        <Link href="/">
          <span className="text-2xl font-bold">Logo</span>
        </Link>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href="/">
            <span
              className={`block py-2 px-4 rounded ${
                pathname === '/' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span
              className={`block py-2 px-4 rounded ${
                pathname === '/about' ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              About
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;