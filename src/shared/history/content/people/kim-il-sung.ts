import { definePerson } from '../../schema'

export default definePerson({
  id: 'kim-il-sung',
  names: [
    { text: 'Kim Il Sung', lang: 'en', role: 'primary' },
    { text: '김일성', lang: 'ko', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1912' },
        cites: [
          {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'KOREAN NATIONALISM AND COMMUNISM', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['head-of-state', 'revolutionary', 'military'],
  offices: [
    {
      title: 'premier',
      start: {
        alts: [
          {
            value: { d: '1948-09-09' },
            cites: [
              {
                source: 'loc-north-korea-country-study-1993',
                loc: { section: 'ORIGINS OF THE DPRK', para: '18' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1972' },
            cites: [
              {
                source: 'loc-north-korea-country-study-1993',
                loc: { section: 'ORIGINS OF THE DPRK', para: '18' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-north-korea-country-study-1993',
          loc: { section: 'ORIGINS OF THE DPRK', para: '18' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Kim_Il-sung_1946.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Kim_Il-sung_1946.JPG',
    credit: { institution: 'The First Anniversary of Korean Liberation (Shinkan Sha)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Within a year of the liberation from Japanese rule, North Korea had a powerful political party, a growing economy, and a single powerful leader, Kim Il Sung.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'ORIGINS OF THE DPRK', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/14.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Both Koreas have spawned myths about the guerrilla resistance: North Korea claims that Kim single-handedly defeated the Japanese, and South Korea claims that the present-day ruler of North Korea is an imposter who stole the name of a revered patriot.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'KOREAN NATIONALISM AND COMMUNISM', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/13.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Kim Il Sung did not appear in North Korea until October 1945; what he did in the two months after the Japanese surrender is not known. When he reappeared, Soviet leaders presented Kim to the Korean people as a guerrilla hero.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'ORIGINS OF THE DPRK', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/14.htm' }
        },
        {
          id: 'q4',
          text: 'In February 1946, an Interim People\'s Committee led by Kim Il Sung became the first central government.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'ORIGINS OF THE DPRK', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/14.htm' }
        },
        {
          id: 'q5',
          text: 'Kim Il Sung was named premier, a title he retained until 1972, when, under a new constitution, he was named president.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'ORIGINS OF THE DPRK', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/14.htm' }
        },
        {
          id: 'q6',
          text: 'Repeated North Korean efforts, blunted by heavy United States Air Force bombing and stubborn resistance by the combined United States and South Korean forces on the Pusan perimeter, denied Kim Il Sung forceful reunification of the peninsula.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/15.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q7',
          text: 'Kim\'s emergence and that of the Kim system dated from mid-1946, by which time he had placed close, loyal allies at the heart of power. His prime assets were his background, his skills at organization, and his ideology.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'ORIGINS OF THE DPRK', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/north-korea/14.htm' }
        }
      ]
    }
  ]
})
