import { REVIEWS } from '@/lib/product';

function Stars({ n }: { n: number }) {
  return (
    <div className="mb-3 text-lg text-amber-400" aria-label={`${n} z 5 hvězdiček`}>
      {'★'.repeat(n)}
      <span className="text-gray-300">{'★'.repeat(5 - n)}</span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-3 text-center text-4xl font-bold">Co říkají rodiny</h2>
        <p className="mb-12 text-center text-sm font-medium uppercase tracking-wide text-gray-400">
          Ukázkové recenze – demo obsah
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <Stars n={r.rating} />
              <blockquote className="mb-4 leading-relaxed text-gray-600">
                „{r.text}"
              </blockquote>
              <figcaption className="font-semibold">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
