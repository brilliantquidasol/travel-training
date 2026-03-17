import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import { referenceAssets } from '../lib/referenceAssets';

const contactInfo = [
  {
    label: 'Phone',
    value: '+1 546 378 654',
    href: 'tel:+1546378654',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@travelpro.com',
    href: 'mailto:info@travelpro.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    label: 'Address',
    value: '123 Travel Street, Suite 100',
    sub: 'New York, NY 10001',
    href: 'https://maps.google.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    label: 'Hours',
    value: 'Mon – Fri: 9am – 6pm',
    sub: 'Sat: 10am – 4pm',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <Navbar />

      {/* Hero */}
      <HeroBanner
        imageSrc={referenceAssets.hero}
        subtitle="Contact Us"
        title="Get in Touch"
        description="Have a question or ready to plan your next trip? We’d love to hear from you."
        cta={{ label: 'View Tours', href: '/#tours' }}
      />

      {/* 1. Contact info cards */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-10">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-xl transition"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                {item.icon}
              </span>
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-gray-900 dark:text-white font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition">
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-900 dark:text-white font-semibold">{item.value}</p>
              )}
              {item.sub && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.sub}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Contact form + side note */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Send a message</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              We’ll get back to you within 24 hours
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Use the form for general inquiries, booking questions, or custom trip requests. For immediate help, call us directly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Booking, inquiry, feedback..."
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                  placeholder="Tell us how we can help..."
                />
              </div>
              {submitted && (
                <p className="text-primary-600 dark:text-primary-400 font-medium">Thanks! We’ll be in touch soon.</p>
              )}
              <button type="submit" className="btn-primary hover:text-white px-6 py-3.5">
                Send message
              </button>
            </form>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Why contact us?</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mt-0.5"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                Custom itineraries and group bookings
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mt-0.5"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                Questions about tours, dates, or pricing
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mt-0.5"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                Partnership and trade inquiries
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mt-0.5"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                Feedback and support after your trip
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Prefer to talk?</p>
              <a href="tel:+1546378654" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">+1 546 378 654</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map / Find us placeholder */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium text-center">Find us</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Visit our office</h2>
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 aspect-video flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Map placeholder — add Google Maps embed or address link</p>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to book a tour?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse our popular packages or call us for a tailored experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#tours" className="btn-primary hover:text-white">Explore Tours</Link>
          <a href="tel:+1546378654" className="rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-800 px-6 py-3.5 font-medium transition hover:text-primary-600">
            Call now
          </a>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
