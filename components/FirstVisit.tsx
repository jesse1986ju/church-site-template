interface Props {
  whatToExpect: string | null;
  whatToWear:   string | null;
  parkingInfo:  string | null;
  kidsInfo:     string | null;
}

const cards = [
  {
    key:   'whatToExpect' as const,
    icon:  '👋',
    title: 'What to Expect',
  },
  {
    key:   'whatToWear' as const,
    icon:  '👕',
    title: 'What to Wear',
  },
  {
    key:   'parkingInfo' as const,
    icon:  '🚗',
    title: 'Parking',
  },
  {
    key:   'kidsInfo' as const,
    icon:  '👶',
    title: 'Kids & Families',
  },
];

export default function FirstVisit({ whatToExpect, whatToWear, parkingInfo, kidsInfo }: Props) {
  const data = { whatToExpect, whatToWear, parkingInfo, kidsInfo };
  const visible = cards.filter((c) => data[c.key]);

  if (!visible.length) return null;

  return (
    <section id="first-visit" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Planning Your First Visit?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          We want you to feel at home from the moment you arrive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visible.map((card) => (
            <div
              key={card.key}
              className="bg-gray-50 rounded-2xl p-6 space-y-3"
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="font-semibold text-gray-900 text-lg">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{data[card.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
