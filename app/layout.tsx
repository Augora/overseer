import { Toaster } from 'sonner';
import { Metadata } from 'next';

import { Providers } from './providers';
import './global.css';
import Header from '../components/Header';

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
    <html lang="en" className="dark">
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
