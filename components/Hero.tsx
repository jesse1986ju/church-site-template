import type { ServiceTime } from '@/lib/church';
import Link from 'next/link';

interface Props {
  churchName:   string;
  churchVoice:  string | null;
  serviceTimes: ServiceTime[] | null;
  addressCity:  string | null;
  addressState: string | null;
}

export default function Hero({ churchName, churchVoice, serviceTimes, addressCity, addressState }: Props) {
  const firstService = serviceTimes?.[0];
  const location     = [addressCity, addressState].filter(Boolean).join(', ');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {location && (
          <p className="text-sm font-medium tracking-widest uppercase text-gray-300">
            {location}
          </p>
        )}

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          {churchName}
        </h1>

        {churchVoice && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {churchVoice}
          </p>
        )}

        {firstService && (
          <p className="text-base text-gray-300">
            Join us {firstService.day}s at {firstService.time}
            {firstService.label ? ` · ${firstService.label}` : ''}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#first-visit"
            className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Plan Your Visit
          </a>
          <a
            href="#service-times"
            className="px-8 py-3 border border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
          >
            Service Times
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
