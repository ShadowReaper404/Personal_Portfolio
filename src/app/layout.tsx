import type { Metadata } from 'next';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website', url: '/', siteName: 'Thevindu Sithujaya',
    title: site.title, description: site.description,
    images: [{ url: '/portrait.jpg', alt: 'Thevindu Sithujaya' }],
  },
  twitter: {
    card: 'summary', title: site.title, description: site.description,
    images: [{ url: '/portrait.jpg', alt: 'Thevindu Sithujaya' }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
