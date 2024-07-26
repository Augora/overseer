import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';

import Header from '../components/Header';
import './global.css';
import { Providers } from './providers';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'auto',
});

export const metadata: Metadata = {
  title: 'Overseer | Groupes Parlementaires',
  description: 'Overseer is a backoffice tool for Augora activities.',
  keywords: 'Overseer, Augora, backoffice, Parlementaires, tool, activities',
  authors: {
    name: 'Augora',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${roboto.className}`}>
      <body>
        <Toaster />
        <Header />
        <div className="p-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
