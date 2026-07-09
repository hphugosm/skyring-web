'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCT } from '@/lib/product';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/assets/hero_bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60 lg:via-white/75 lg:to-white/20" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-4 inline-block rounded-full bg-sky-brandLight px-4 py-1.5 text-sm font-semibold text-sky-brandDark">
            {PRODUCT.edition} · 396 cm · síť 180 cm
          </p>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            {PRODUCT.name}
          </h1>
          <p className="mb-10 max-w-lg text-xl leading-relaxed text-gray-600">
            {PRODUCT.tagline} Pozinkovaný rám s 8 W-nohami, 96 pružin a
            bezpečnostní síť se vstupem na zip.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#objednat"
              className="rounded-xl bg-sky-brand px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-brand/30 transition hover:bg-sky-brandDark"
            >
              Chci ji na zahradu
            </a>
            <a
              href="#funkce"
              className="rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-ink transition hover:border-sky-brand hover:text-sky-brand"
            >
              Prohlédnout ve 3D ↓
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <Image
            src="/assets/cutout_master.webp"
            alt="Trampolína SkyRing 400 – Blue Edition"
            width={880}
            height={657}
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="h-auto w-full drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
