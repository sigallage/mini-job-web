import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mini Job Board',
  description: 'Simple modern job board using Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
