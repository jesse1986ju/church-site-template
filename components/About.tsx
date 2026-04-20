import Image from 'next/image';

interface Props {
  churchName:  string;
  pastorName:  string | null;
  churchVoice: string | null;
  photoUrls:   string[] | null;
}

export default function About({ churchName, pastorName, churchVoice, photoUrls }: Props) {
  const photos = photoUrls?.slice(0, 3) ?? [];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              About {churchName}
            </h2>

            {churchVoice && (
              <p className="text-gray-600 leading-relaxed text-lg">
                {churchVoice}
              </p>
            )}

            {pastorName && (
              <p className="text-sm text-gray-500 font-medium">
                Pastor · {pastorName}
              </p>
            )}
          </div>

          {/* Photos */}
          {photos.length > 0 && (
            <div className={`grid gap-3 ${photos.length === 1 ? 'grid-cols-1' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {photos.map((url, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 && photos.length === 3 ? 'col-span-2 h-48' : 'h-40'}`}
                >
                  <Image
                    src={url}
                    alt={`${churchName} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
