'use client';

import { useEffect, useRef } from 'react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pojistka: některé prohlížeče pozastaví offscreen video a samy ho
  // neobnoví – spustíme přehrávání, jakmile je sekce ve viewportu.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-3 text-center text-4xl font-bold">Radost, kterou uvidíte každý den</h2>
        <p className="mb-12 text-center text-lg text-white/60">
          Tlumený odraz šetří klouby, síť dodá klid vám.
        </p>
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            src="/assets/lifestyle.mp4"
            poster="/assets/garden_scene.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
