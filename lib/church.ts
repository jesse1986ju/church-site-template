// Fetches church data from the shared Supabase instance.
// CHURCH_ID and SUPABASE_* are injected as Cloudflare Pages env vars at build time.

export interface ServiceTime {
  day:   string;
  time:  string;
  label: string;
}

export interface ChurchData {
  // Identity
  church_name:      string;
  subdomain:        string | null;
  domain:           string | null;
  site_live_url:    string | null;
  // Onboarding content
  pastor_name:      string | null;
  address_street:   string | null;
  address_city:     string | null;
  address_state:    string | null;
  address_zip:      string | null;
  service_times:    ServiceTime[] | null;
  what_to_expect:   string | null;
  what_to_wear:     string | null;
  parking_info:     string | null;
  kids_info:        string | null;
  church_voice:     string | null;
  sermon_embed_url: string | null;
  photo_urls:       string[] | null;
}

export async function getChurchData(): Promise<ChurchData | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const churchId    = process.env.CHURCH_ID;

  if (!supabaseUrl || !supabaseKey || !churchId) {
    console.error('[church] Missing required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CHURCH_ID');
    return null;
  }

  // Fetch church identity
  const churchRes = await fetch(
    `${supabaseUrl}/rest/v1/churches?id=eq.${churchId}&select=church_name,subdomain,domain,site_live_url`,
    {
      headers: {
        apikey:        supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 }, // ISR: revalidate every 60s
    }
  );

  // Fetch onboarding content
  const dataRes = await fetch(
    `${supabaseUrl}/rest/v1/onboarding_data?church_id=eq.${churchId}&select=*`,
    {
      headers: {
        apikey:        supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!churchRes.ok || !dataRes.ok) return null;

  const [churches, rows] = await Promise.all([
    churchRes.json() as Promise<Array<{
      church_name:   string;
      subdomain:     string | null;
      domain:        string | null;
      site_live_url: string | null;
    }>>,
    dataRes.json() as Promise<Array<Record<string, unknown>>>,
  ]);

  if (!churches.length) return null;

  const church = churches[0];
  const row    = rows[0] ?? {};

  return {
    church_name:      church.church_name,
    subdomain:        church.subdomain,
    domain:           church.domain,
    site_live_url:    church.site_live_url,
    pastor_name:      (row.pastor_name as string) ?? null,
    address_street:   (row.address_street as string) ?? null,
    address_city:     (row.address_city as string) ?? null,
    address_state:    (row.address_state as string) ?? null,
    address_zip:      (row.address_zip as string) ?? null,
    service_times:    (row.service_times as ServiceTime[]) ?? null,
    what_to_expect:   (row.what_to_expect as string) ?? null,
    what_to_wear:     (row.what_to_wear as string) ?? null,
    parking_info:     (row.parking_info as string) ?? null,
    kids_info:        (row.kids_info as string) ?? null,
    church_voice:     (row.church_voice as string) ?? null,
    sermon_embed_url: (row.sermon_embed_url as string) ?? null,
    photo_urls:       (row.photo_urls as string[]) ?? null,
  };
}
