import { definePeriod } from '../../schema'

export default definePeriod({
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
  researched: '2026-10-06',
  periodType: 'regime',
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
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
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
    }
  ]
})
