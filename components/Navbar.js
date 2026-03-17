import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, role, signOut } = useAuth();

  useEffect(() => {
    if (!searchOpen) setSearchQuery('');
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    router.push(q ? `/?q=${encodeURIComponent(q)}#tours` : '/#tours');
    setTimeout(() => {
      const el = document.getElementById('tours');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

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
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-white/80 transition p-1"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {user ? (
              <>
                <Link href="/dashboard" className={navLinkClass}>Dashboard</Link>
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

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60"
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-label="Search"
        >
          <form
            onSubmit={handleSearchSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 p-3">
              <span className="text-slate-400 shrink-0" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tours (destination, title, category)..."
                className="flex-1 min-w-0 px-2 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
                autoFocus
              />
              <button type="submit" className="shrink-0 rounded-lg bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700">
                Find Now
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="shrink-0 p-2 text-slate-500 hover:text-slate-700" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}

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
          <button type="button" className={mobileLinkClass + ' w-full text-left'} onClick={() => { setIsOpen(false); setSearchOpen(true); }}>
            Search
          </button>
          <Link href="/" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className={mobileLinkClass} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/destinations" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Destinations</Link>
          <Link href="#tours" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Tours</Link>
          <Link href="/contact" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Contact Us</Link>
          {user ? (
            <>
              <Link href="/dashboard" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Dashboard</Link>
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
