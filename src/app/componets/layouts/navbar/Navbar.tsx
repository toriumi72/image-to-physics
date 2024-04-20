// src/app/components/layout/navbar/Navbar.tsx

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <Link href="/">
          <span className="text-2xl font-bold">Logo</span>
        </Link>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href="/">
            <span className="block py-2 px-4 hover:bg-gray-800 rounded">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span className="block py-2 px-4 hover:bg-gray-800 rounded">About</span>
          </Link>
        </li>
        <li>
          <Link href="/services">
            <span className="block py-2 px-4 hover:bg-gray-800 rounded">Services</span>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <span className="block py-2 px-4 hover:bg-gray-800 rounded">Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;