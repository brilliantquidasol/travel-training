import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = 'text-gray-900 dark:text-white hover:text-blue-500 transition';
  const mobileLinkClass = 'block text-gray-900 dark:text-white hover:bg-white/20 rounded px-3 py-2 transition';

  return (
    <nav className="glass fixed w-full z-50 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
            TravelPro
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#tours" className={navLinkClass}>
              Tours
            </Link>
            <Link href="/about" className={navLinkClass}>
              About
            </Link>
            <Link href="/contact" className={navLinkClass}>
              Contact
            </Link>
            <Link href="/signup" className="glass-btn px-4 py-2">
              Sign Up
            </Link>
            <Link href="/admin/dashboard" className={navLinkClass + ' text-sm'}>
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white focus:outline-none p-2"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
          <Link href="#tours" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
            Tours
          </Link>
          <Link href="/about" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/signup" className="glass-btn block text-center w-full py-2 mt-2" onClick={() => setIsOpen(false)}>
            Sign Up
          </Link>
          <Link href="/admin/dashboard" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
