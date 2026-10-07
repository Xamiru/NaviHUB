import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-adrianople',
  names: [
    { text: 'Treaty of Adrianople', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1829' },
        cites: [
          {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    { ref: 'place:edirne' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Later, in 1826, an internal crisis forced the sultan to accede to Russia\'s demand for greater influence in the principalities.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Russia again invaded the principalities during the Russo-Turkish War of 1828, which resulted in the 1829 Treaty of Adrianople.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        },
        {
          id: 'q3',
          text: 'The treaty provided for Russian occupation of the principalities until the Ottomans had fully paid an indemnity, the election of native Romanian princes for life, and an independent national administration and freedom of worship and commerce under Russian protection.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Despite the fact that the Porte remained the principalities\' suzerain and could exact a fixed tribute and direct certain aspects of foreign policy, the sultan could neither reject nor remove a prince without Russian consent.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B5_%D0%B2_%D0%90%D0%B4%D1%80%D0%B8%D0%B0%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%B5_1829.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B5_%D0%B2_%D0%90%D0%B4%D1%80%D0%B8%D0%B0%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%B5_1829.jpg',
    credit: { institution: 'N. A. Epanchin, Ocherk pokhoda 1829 g. v Evropeiskoi Turtsii' },
    license: { id: 'public-domain' }
  }
})
