'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY } from '@/lib/product';

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + GALLERY.length) % GALLERY.length
      ),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-center text-4xl font-bold">Galerie</h2>
        <p className="mb-12 text-center text-lg text-gray-500">
          Prohlédněte si SkyRing 400 do posledního detailu.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-brand/40"
              aria-label={`Zvětšit: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[open].alt}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative max-h-[88vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={GALLERY[open].src}
                  alt={GALLERY[open].alt}
                  fill
                  sizes="90vw"
                  className="rounded-lg object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm text-white/80">
                {GALLERY[open].alt} ({open + 1}/{GALLERY.length})
              </p>
              <button
                onClick={close}
                aria-label="Zavřít"
                className="absolute -top-3 right-0 rounded-full bg-white/10 px-4 py-2 text-2xl leading-none text-white hover:bg-white/20"
              >
                ×
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Předchozí"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-3xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Další"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-3xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
