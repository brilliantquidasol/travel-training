import Link from 'next/link';

export default function Footer() {
  const linkClass = 'text-gray-400 hover:text-white transition-colors duration-200';

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-gray-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8 Q8 6 12 8 T20 8" /><path d="M4 12 Q8 10 12 12 T20 12" /><path d="M4 16 Q8 14 12 16 T20 16" />
                </svg>
              </span>
              <span className="text-xl font-bold text-white">TravelPro</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              We are professional planners dedicated to creating seamless and memorable travel experiences for every traveler.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className={linkClass} aria-label="Facebook">Facebook</a>
              <a href="#" className={linkClass} aria-label="Twitter">Twitter</a>
              <a href="#" className={linkClass} aria-label="Instagram">Instagram</a>
              <a href="#" className={linkClass} aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className={linkClass}>Home</Link></li>
              <li><Link href="#tours" className={linkClass}>Tours</Link></li>
              <li><Link href="/about" className={linkClass}>About Us</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className={linkClass}>Terms & Conditions</Link></li>
              <li><Link href="#" className={linkClass}>Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+8123985789" className={linkClass}>+8 (123) 985 789</a></li>
              <li><a href="mailto:info@travelpro.com" className={linkClass}>info@travelpro.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TravelPro. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
