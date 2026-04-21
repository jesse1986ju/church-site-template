import { getChurchData } from '@/lib/church';
import Hero from '@/components/Hero';
import ServiceTimes from '@/components/ServiceTimes';
import About from '@/components/About';
import FirstVisit from '@/components/FirstVisit';
import Sermon from '@/components/Sermon';
import Footer from '@/components/Footer';
import EventTracker from '@/components/EventTracker';

export const revalidate = 60; // ISR — rebuild at most every 60s

export default async function HomePage() {
  const church = await getChurchData();

  if (!church) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Site coming soon.</p>
      </div>
    );
  }

  return (
    <main>
      <Hero
        churchName={church.church_name}
        churchVoice={church.church_voice}
        serviceTimes={church.service_times}
        addressCity={church.address_city}
        addressState={church.address_state}
      />
      <ServiceTimes serviceTimes={church.service_times} />
      <About
        churchName={church.church_name}
        pastorName={church.pastor_name}
        churchVoice={church.church_voice}
        photoUrls={church.photo_urls}
      />

      {/* Scroll sentinel — sits at ~50% of page content.
          EventTracker fires scroll_50 when this enters the viewport. */}
      <div id="scroll-sentinel" aria-hidden="true" />

      <FirstVisit
        whatToExpect={church.what_to_expect}
        whatToWear={church.what_to_wear}
        parkingInfo={church.parking_info}
        kidsInfo={church.kids_info}
      />
      {church.sermon_embed_url && (
        <Sermon embedUrl={church.sermon_embed_url} />
      )}
      <Footer
        churchName={church.church_name}
        addressStreet={church.address_street}
        addressCity={church.address_city}
        addressState={church.address_state}
        addressZip={church.address_zip}
        serviceTimes={church.service_times}
      />

      {/* Client-side event tracker — renders nothing, fires Supabase events */}
      <EventTracker />
    </main>
  );
}
