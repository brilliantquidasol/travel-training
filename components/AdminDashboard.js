import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IconTours,
  IconInquiries,
  IconDestinations,
  IconOrders,
  IconChevronRight,
} from './admin/Icons';

const featureCards = [
  {
    href: '/admin/tours',
    title: 'Tour & Package Management',
    description: 'Easily create, manage, and showcase your tour packages with detailed itineraries, pricing, duration, highlights, galleries, and booking options. Design beautiful tour pages using the Live Page Builder and attract travelers with immersive content.',
    action: 'Manage tours',
    Icon: IconTours,
    color: 'teal',
  },
  {
    href: '/admin/inquiries',
    title: 'Booking Inquiry System',
    description: 'TravelPro features a flexible booking inquiry system designed for personalized travel services. Customers can submit tour booking requests through a contact or inquiry form, and your team can manually follow up to confirm details, pricing, and availability.',
    action: 'View inquiries',
    Icon: IconInquiries,
    color: 'blue',
  },
  {
    href: '/admin/destinations',
    title: 'Destination Management',
    description: 'Highlight popular travel destinations with rich content, stunning images, maps, and travel information. Create SEO-friendly destination pages to inspire travelers and improve search engine visibility.',
    action: 'Manage destinations',
    Icon: IconDestinations,
    color: 'amber',
  },
  {
    href: '/admin/orders',
    title: 'eCommerce Ready',
    description: 'Built-in eCommerce functionality allows you to sell tour packages, travel services, merchandise, or add-ons effortlessly. Manage orders, payments, and customers from a single dashboard.',
    action: 'Orders & payments',
    Icon: IconOrders,
    color: 'violet',
  },
];

const colorMap = {
  teal: 'bg-teal-500/10 text-teal-600 border-teal-200',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
  amber: 'bg-amber-500/10 text-amber-600 border-amber-200',
  violet: 'bg-violet-500/10 text-violet-600 border-violet-200',
};

export default function AdminDashboard() {
  const [tourCount, setTourCount] = useState(null);

  useEffect(() => {
    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => setTourCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setTourCount(0));
  }, []);

  const stats = [
    { label: 'Tour packages', value: tourCount ?? '—', icon: IconTours },
    { label: 'Inquiries', value: '—', icon: IconInquiries },
    { label: 'Destinations', value: '—', icon: IconDestinations },
    { label: 'Orders', value: '—', icon: IconOrders },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-600">Manage tours, bookings, destinations, and orders from one place.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Icon />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions / Features */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick actions</h2>
        <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
          {featureCards.map(({ href, title, description, action, Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${colorMap[color]}`}
                >
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:gap-2 transition-all">
                    {action}
                    <IconChevronRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
