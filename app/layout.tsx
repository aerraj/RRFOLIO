import type { Metadata } from 'next';
import { Archivo, Newsreader } from 'next/font/google';
import '@/styles/globals.css';

import { metadata as meta } from './config';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-display' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-serif', adjustFontFallback: false });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : meta.site.url);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: meta.site.title, template: `%s | ${meta.site.title}` },
  description: meta.site.description,
  keywords: meta.site.keywords,
  creator: meta.author.username,
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: { url: siteUrl, type: 'website', title: meta.site.title, description: meta.site.description, images: [{ url: `${basePath}/images/rrfolio/crimson.jpg`, width: 1672, height: 941, alt: 'RRFOLIO — research, markets and systems' }] },
  twitter: { card: 'summary_large_image', title: meta.site.title, description: meta.site.description, images: [`${basePath}/images/rrfolio/crimson.jpg`] },
  icons: { icon: `${basePath}/favicon/favicon.svg` }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.className} ${archivo.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  );
}
