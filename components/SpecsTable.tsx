import { SPECS } from '@/lib/product';

export default function SpecsTable() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-3 text-center text-4xl font-bold">Technické specifikace</h2>
        <p className="mb-12 text-center text-lg text-gray-500">
          Vše podstatné černé na bílém.
        </p>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody>
              {SPECS.map(([label, value], i) => (
                <tr key={label} className={i % 2 ? 'bg-gray-50/60' : ''}>
                  <th
                    scope="row"
                    className="w-1/3 px-6 py-4 align-top text-sm font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {label}
                  </th>
                  <td className="px-6 py-4 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
