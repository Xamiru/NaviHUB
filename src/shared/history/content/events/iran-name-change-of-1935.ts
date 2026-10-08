import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-name-change-of-1935',
  names: [
    { text: 'Persia renamed Iran in international usage', lang: 'en', role: 'primary' },
    { text: 'رسمیت نام ایران به جای پرشیا', lang: 'fa', role: 'native' },
    { text: 'Iran instead of Persia', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1935-03-20' },
        cites: [
          {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'global'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'Reżā Shah ordered that, from March 20 onwards, the country be called Iran instead of Persia in all international communications',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After some initial resistance on the part of economic experts had been overcome, from late 1934 onwards the German government took measures to revive relations with Persia, which culminated in an important agreement signed in March 1935.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In 1935 it was renamed the Anglo-Iranian Oil Company (AIOC) to conform with Reżā Shah’s wish that foreign governments should call the country Iran rather than Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        },
        {
          id: 'q2',
          text: 'Persia itself (or Iran, as it would be known from 1935 onward) would emerge into prominence on the world oil stage.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%D8%AF%D8%B1_%D8%A7%D9%88%D8%A7%DB%8C%D9%84_%D8%B3%D9%84%D8%B7%D9%86%D8%AA_-_%D8%AA%D8%B5%D9%88%DB%8C%D8%B1_%D9%85%D9%86%D8%AA%D8%B4%D8%B1%D8%B4%D8%AF%D9%87_%D8%AF%D8%B1_%DA%A9%D8%AA%D8%A7%D8%A8_%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%DA%A9%D8%A8%DB%8C%D8%B1_%DB%8C%D8%A7_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86_%D9%86%D9%88.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%D8%AF%D8%B1_%D8%A7%D9%88%D8%A7%DB%8C%D9%84_%D8%B3%D9%84%D8%B7%D9%86%D8%AA_-_%D8%AA%D8%B5%D9%88%DB%8C%D8%B1_%D9%85%D9%86%D8%AA%D8%B4%D8%B1%D8%B4%D8%AF%D9%87_%D8%AF%D8%B1_%DA%A9%D8%AA%D8%A7%D8%A8_%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%DA%A9%D8%A8%DB%8C%D8%B1_%DB%8C%D8%A7_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86_%D9%86%D9%88.jpg',
    credit: { institution: 'Grand Ayatollah Boroujerdi Library' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' }
  ]
})
