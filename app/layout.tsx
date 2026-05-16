import type { Metadata } from 'next';
import './globals.css';

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const churchName = process.env.CHURCH_NAME ?? 'Our Church';
  return {
    title:       churchName,
    description: `Welcome to ${churchName}. Find service times, location, and more.`,
    openGraph: {
      title:       churchName,
      description: `Welcome to ${churchName}.`,
      type:        'website',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
