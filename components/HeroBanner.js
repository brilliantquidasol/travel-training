import Link from 'next/link';

/**
 * Reusable hero banner: full-bleed image, overlay, subtitle, title, optional description and CTA.
 * @param {string} imageSrc - Background image URL
 * @param {string} [subtitle] - Small label above the title (e.g. "About Us")
 * @param {string} title - Main headline
 * @param {string} [description] - Optional paragraph below title
 * @param {object} [cta] - Optional CTA: { label, href }
 * @param {string} [className] - Extra classes for the section
 * @param {boolean} [dark=true] - Use dark overlay and white text
 */
export default function HeroBanner({
  imageSrc,
  subtitle,
  title,
  description,
  cta,
  className = '',
  dark = true,
}) {
  return (
    <section
      className={`relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div
          className={`absolute inset-0 ${dark ? 'bg-black/50' : 'bg-white/30'}`}
        />
      </div>
      <div className="relative z-10 px-4 pt-28 pb-28 sm:pt-32 sm:pb-32 w-full max-w-4xl mx-auto">
        {subtitle && (
          <p
            className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-3 ${
              dark ? 'text-white/90' : 'text-gray-700'
            }`}
          >
            {subtitle}
          </p>
        )}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
            dark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto ${
              dark ? 'text-white/90' : 'text-gray-700'
            }`}
          >
            {description}
          </p>
        )}
        {cta?.label && cta?.href && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white hover:text-white font-medium px-6 py-3.5 transition shadow-lg"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
