import '../styles/globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-airbnb',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${plusJakarta.variable} ${plusJakarta.className}`}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
