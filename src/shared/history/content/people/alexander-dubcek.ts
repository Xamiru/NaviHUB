import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-dubcek',
  names: [
    { text: 'Alexander Dubček', lang: 'en', role: 'primary' },
    { text: 'Alexander Dubcek', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'first secretary of the KSC',
      start: {
        alts: [
          {
            value: { d: '1968-01-05' },
            cites: [
              {
                source: 'loc-czechoslovakia-country-study-1987',
                loc: { section: 'The Reform Movement', para: '6' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1969-04' },
            cites: [
              {
                source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
                loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'The Reform Movement', para: '6' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/%C5%98%C3%ADp%2C_10._5._1968_-_A._Dub%C4%8Dek.jpg/1280px-%C5%98%C3%ADp%2C_10._5._1968_-_A._Dub%C4%8Dek.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%C5%98%C3%ADp,_10._5._1968_-_A._Dub%C4%8Dek.jpg',
    credit: {
      institution: 'Private photographic collection (photographers own work, released to Commons)',
      creator: 'Marie Cheidzeova'
    },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the October 30-31 meeting of the KSC Central Committee, Alexander Dubcek, a moderate reformer, challenged Novotny.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Reform Movement', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/39.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Dubcek carried the reform movement a step further in the direction of liberalism. After Novotny\'s fall, censorship was lifted.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Prague Spring, 1968', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/40.htm'
          }
        },
        {
          id: 'q3',
          text: 'At the meeting, Dubcek defended the program of the reformist wing of the KSC while pledging commitment to the Warsaw Pact and Comecon.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Intervention', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/41.htm'
          }
        }
      ]
    }
  ]
})
