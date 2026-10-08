import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-afghanistan',
  names: [
    { text: 'Kingdom of Afghanistan', lang: 'en', role: 'primary' },
    { text: 'پادشاهی افغانستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Third Anglo-Afghan War and Independence', para: '5' }
          }
        ]
      },
      {
        value: { d: '1926-06' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '24' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1973-07-17' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'DAOUD\'S REPUBLIC, JULY 1973- APRIL 1978', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Afghanistan (code 700), capital Kabul' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:emirate-of-afghanistan' }
  ],
  cshapes: [
    { set: 'world', code: 700, from: 1926.45, to: 1973.54 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Afghan_King_Amanullah_Khan_and_French_President_Gaston_Doumergue_in_Paris%2C_1928.jpg/1280px-Afghan_King_Amanullah_Khan_and_French_President_Gaston_Doumergue_in_Paris%2C_1928.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Afghan_King_Amanullah_Khan_and_French_President_Gaston_Doumergue_in_Paris,_1928.jpg',
    credit: {
      institution: 'Bibliothèque nationale de France (Gallica)',
      creator: 'Agence de presse Meurisse'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the 1920s, Afghanistan established diplomatic relations with most major countries, and Amanullah became king in 1923.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Third Anglo-Afghan War and Independence', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/18.htm' }
        },
        {
          id: 'q2',
          text: 'In June, 1926, Amānallāh symbolically completed this process by abandoning the less important title of amir for the more prestigious one of shah.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1931 the king promulgated a new constitution. Despite its appearance as a constitutional monarchy, the document officially instituted a royal oligarchy, and popular participation was merely an illusion.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'MUHAMMAD NADIR SHAH, 1929-33', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/21.htm' }
        },
        {
          id: 'q4',
          text: 'Zahir Shah, Nadir Shan\'s son and successor, became Afghanistan\'s final king.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'MOHAMMAD ZAHIR SHAH, 1933-73', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/22.htm' }
        },
        {
          id: 'q5',
          text: 'The single greatest achievement of the 1963-73 decade was the promulgation of the 1964 constitution.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The King Reigns: The Last Decade of the Monarchy, 1963-73', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/27.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The welcome Daoud received on returning to power on July 17, 1973 reflected the citizenry\'s disappointment with the lackluster politics of the preceding decade.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'DAOUD\'S REPUBLIC, JULY 1973- APRIL 1978', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/28.htm' }
        }
      ]
    }
  ]
})
