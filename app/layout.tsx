import { Providers } from './providers';

import './global.css';
import Header from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        <div className="p-3">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
