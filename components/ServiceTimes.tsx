import type { ServiceTime } from '@/lib/church';

interface Props {
  serviceTimes: ServiceTime[] | null;
}

export default function ServiceTimes({ serviceTimes }: Props) {
  if (!serviceTimes?.length) return null;

  return (
    <section id="service-times" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Service Times
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTimes.map((s, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
                {s.day}
              </p>
              <p className="text-2xl font-bold text-gray-900">{s.time}</p>
              {s.label && (
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
