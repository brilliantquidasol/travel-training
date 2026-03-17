import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  IconDashboard,
  IconTours,
  IconInquiries,
  IconDestinations,
  IconOrders,
  IconExternal,
  IconMenu,
  IconX,
} from './admin/Icons';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { href: '/admin/tours', label: 'Tours & Packages', Icon: IconTours },
  { href: '/admin/inquiries', label: 'Booking Inquiries', Icon: IconInquiries },
  { href: '/admin/destinations', label: 'Destinations', Icon: IconDestinations },
  { href: '/admin/orders', label: 'Orders', Icon: IconOrders },
];

function Sidebar({ currentPath, onNavigate }) {
  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-slate-200 border-r border-slate-700/50">
      {/* Logo */}
      <div className="flex items-center gap-2.5 h-16 px-5 border-b border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-slate-900">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8 Q8 6 12 8 T20 8" />
            <path d="M4 12 Q8 10 12 12 T20 12" />
            <path d="M4 16 Q8 14 12 16 T20 16" />
          </svg>
        </span>
        <span className="font-semibold text-white">TravelPro</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        <span className="px-3 text-xs font-medium uppercase tracking-wider text-slate-500">Menu</span>
        {navItems.map(({ href, label, Icon }) => {
          const isActive = currentPath === href || (href !== '/admin/dashboard' && currentPath.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          <IconExternal />
          View site
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, role, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/signin?redirect=' + encodeURIComponent(router.asPath));
      return;
    }
    if (role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  const currentPath = router.pathname;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar currentPath={currentPath} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar currentPath={currentPath} onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 h-14 px-4 lg:px-8 bg-white border-b border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 hidden sm:inline">Admin</span>
            <Link
              href="/account"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Account
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
