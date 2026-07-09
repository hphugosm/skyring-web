import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SkyRing 400 – Blue Edition | Kulatá zahradní trampolína 396 cm',
  description:
    'SkyRing 400 – Blue Edition. Kulatá zahradní trampolína 396 cm s ochrannou sítí 180 cm, 96 pružinami a pozinkovaným rámem. Bezpečnost a zábava pro celou rodinu.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
