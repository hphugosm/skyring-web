# SkyRing 400 – Blue Edition

Produktová landing page pro kulatou zahradní trampolínu **SkyRing 400 – Blue Edition** s interaktivním 3D modelem řízeným scrollem. Postaveno jako ukázka scroll-driven 3D produktovky ve stylu Apple product pages.

🔗 **Live:** https://skyring-web.vercel.app

> Ukázkový/demo projekt. Produkt, ceny i recenze jsou fiktivní. Vizuály byly vygenerovány přes Higgsfield (rendery, 3D model, lifestyle video).

---

## Co stránka umí

- **Hero** – zahradní scéna, průhledný render trampolíny, dvě CTA.
- **Scroll-driven 3D sekce** – reálný GLB model v `react-three-fiber`, „pinned" přes 600 vh scrollu. Scroll progress je namapovaný na 6 keyframů kamery (čelní pohled → nohy → pružiny → plocha → límec → síť) se `smoothstep` interpolací a dampingem; textové panely s průhlednými detaily se crossfadují synchronně s pohledem.
- **Mobilní varianta** (< 1024 px) – menší model s jemnou auto-rotací, panely pod sebou.
- **Tabulka technických specifikací**, **galerie** 9 fotek s lightboxem (klávesy ←/→/Esc), **video sekce** (autoplay/muted/loop), **demo recenze** (viditelně označené), **finální CTA**.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) – render GLB modelu
- [GSAP](https://gsap.com/) + ScrollTrigger – scroll-driven animace
- [Framer Motion](https://www.framer.com/motion/) – přechody UI
- [Tailwind CSS](https://tailwindcss.com/) – styling

## Spuštění lokálně

```bash
npm install
npm run dev
```

Otevři http://localhost:3000.

Produkční build:

```bash
npm run build && npm run start
```

## Struktura

```
skyring-web/
├── app/                  layout.tsx, page.tsx, globals.css
├── components/           Hero, FeatureScroll (3D scroll sekce), TrampolineModel,
│                         SpecsTable, Gallery, VideoSection, Reviews, FinalCTA
├── lib/product.ts        specifikace, keyframy kamery, texty panelů
└── public/assets/        WebP obrázky + skyring400.glb + lifestyle.mp4
```

Keyframy kamery upravíš v [`lib/product.ts`](lib/product.ts) – model je normalizovaný na poloměr ~1 se středem v počátku.

## Poznámky k výkonu

- GLB (6,6 MB → **808 KB**) komprimovaný přes `gltf-transform`: nejdřív WebP textury, pak Draco.
- Statický obrázek jako overlay během načítání modelu + error boundary fallback.
- Všechny obrázky ve WebP se `srcset` přes `next/image`, rezervované rozměry proti layout shiftům.
