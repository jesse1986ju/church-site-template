import type { ServiceTime } from '@/lib/church';

interface Props {
  churchName:    string;
  addressStreet: string | null;
  addressCity:   string | null;
  addressState:  string | null;
  addressZip:    string | null;
  serviceTimes:  ServiceTime[] | null;
}

export default function Footer({
  churchName,
  addressStreet,
  addressCity,
  addressState,
  addressZip,
  serviceTimes,
}: Props) {
  const addressLine1 = addressStreet;
  const addressLine2 = [addressCity, addressState, addressZip].filter(Boolean).join(', ');
  const mapsQuery    = encodeURIComponent([addressStreet, addressCity, addressState, addressZip].filter(Boolean).join(' '));

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Church name */}
          <div>
            <h3 className="text-white font-bold text-xl mb-3">{churchName}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              You are welcome here.
            </p>
          </div>

          {/* Address */}
          {(addressLine1 || addressLine2) && (
            <div>
              <h4 className="text-white font-semibold mb-3">Location</h4>
              {addressLine1 && <p className="text-sm">{addressLine1}</p>}
              {addressLine2 && <p className="text-sm">{addressLine2}</p>}
              {mapsQuery && (
                <a
                  href={`https://maps.google.com/?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 mt-2 inline-block"
                >
                  Get directions →
                </a>
              )}
            </div>
          )}

          {/* Service times */}
          {serviceTimes?.length ? (
            <div>
              <h4 className="text-white font-semibold mb-3">Services</h4>
              <ul className="space-y-1">
                {serviceTimes.map((s, i) => (
                  <li key={i} className="text-sm">
                    {s.day} · {s.time}
                    {s.label ? ` · ${s.label}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} {churchName}. Site by{' '}
          <a
            href="https://engagemychurch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Engage My Church
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
