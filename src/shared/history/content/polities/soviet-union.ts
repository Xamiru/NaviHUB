import { definePolity } from '../../schema'

export default definePolity({
  id: 'soviet-union',
  names: [
    { text: 'Soviet Union', lang: 'en', role: 'primary' },
    { text: 'Союз Советских Социалистических Республик', lang: 'ru', role: 'native' },
    {
      text: 'Union der Sozialistischen Sowjetrepubliken',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '225' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'union',
  start: {
    alts: [
      {
        value: { d: '1922-12' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1991-12-25' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Russia (Soviet Union) (code 365), capital Moscow' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:russian-empire' }
  ],
  cshapes: [
    { set: 'world', code: 365, from: 1922.99, to: 1991.99 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Lenin_LCCN2014715123_%28cropped%29.jpg/1280px-Lenin_LCCN2014715123_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lenin_LCCN2014715123_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Viktor Bulla' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The constituent republics of this "Soviet Union" (the Russian, Belorussian, Ukrainian, and Transcaucasian republics--the last combining Armenia, Azerbaijan, and Georgia) exercised a degree of cultural and linguistic autonomy, while the communist, predominantly Russian, leadership in Moscow retained political authority over the entire country.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q2',
          text: 'By that year, the Soviet Union included eleven republics, all with government structures and ruling communist parties identical to the one in the Russian Republic.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'On December 8, Yeltsin and the leaders of Belarus (which adopted that name in August 1991) and Ukraine met at Minsk, the capital of Belarus, where they created the Commonwealth of Independent States (CIS--see Glossary) and annulled the 1922 union treaty that had established the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/20.htm' }
        },
        {
          id: 'q4',
          text: 'On December 25, 1991, the Soviet Union ceased to exist.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/20.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'gurvich-1923-istoriia-sovetskoi-konstitutsii', perspective: 'russian-soviet' },
    { source: 'medvedev-1974-k-sudu-istorii', perspective: 'russian-soviet' },
    { source: 'mints-1977-istoriia-velikogo-oktiabria', perspective: 'russian-soviet' }
  ]
})
