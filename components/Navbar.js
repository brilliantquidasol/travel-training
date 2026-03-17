import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, signOut } = useAuth();

  const navLinkClass = 'text-white hover:text-white/80 transition text-sm font-medium';
  const mobileLinkClass = 'block text-white hover:bg-white/10 rounded px-3 py-2 transition';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#1F2D3D] shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8 lg:gap-12">
          {/* Logo - teal icon + TravelPro */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-400 text-[#1F2D3D]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 8 Q8 6 12 8 T20 8" />
                <path d="M4 12 Q8 10 12 12 T20 12" />
                <path d="M4 16 Q8 14 12 16 T20 16" />
              </svg>
            </span>
            <span className="text-xl font-bold text-white">TravelPro</span>
          </Link>

          {/* Center - Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={navLinkClass}>Home</Link>
            <Link href="/about" className={navLinkClass}>About Us</Link>
            <Link href="/destinations" className={navLinkClass}>Destinations</Link>
            <Link href="#tours" className={navLinkClass}>Tours</Link>
            <Link href="/contact" className={navLinkClass}>Contact Us</Link>
          </div>

          {/* Right - Icons + phone + auth */}
          <div className="hidden lg:flex items-center gap-6">
            <button type="button" className="text-white hover:text-white/80 transition p-1" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {user ? (
              <>
                <Link href="/account" className={navLinkClass}>Account</Link>
                {role === 'admin' && (
                  <Link href="/admin/dashboard" className={navLinkClass}>Admin</Link>
                )}
                <button type="button" onClick={() => signOut()} className={navLinkClass}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className={navLinkClass}>Sign In</Link>
                <Link href="/signup" className={navLinkClass}>Sign Up</Link>
              </>
            )}
            <a href="tel:+8123985789" className="text-white hover:text-white/80 transition text-sm font-medium whitespace-nowrap">
              +8 (123) 985 789
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#1F2D3D] border-t border-white/10 px-4 py-4 space-y-2">
          <Link href="/" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className={mobileLinkClass} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/destinations" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Destinations</Link>
          <Link href="#tours" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Tours</Link>
          <Link href="/contact" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Contact Us</Link>
          {user ? (
            <>
              <Link href="/account" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Account</Link>
              {role === 'admin' && (
                <Link href="/admin/dashboard" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Admin</Link>
              )}
              <button type="button" className={mobileLinkClass + ' w-full text-left'} onClick={() => { signOut(); setIsOpen(false); }}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/signin" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link href="/signup" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
          <a href="tel:+8123985789" className="block text-white/90 py-2">+8 (123) 985 789</a>
        </div>
      )}
    </nav>
  );
}
