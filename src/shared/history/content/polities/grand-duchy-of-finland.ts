import { definePolity } from '../../schema'

export default definePolity({
  id: 'grand-duchy-of-finland',
  names: [
    { text: 'Grand Duchy of Finland', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  polityType: 'grand-duchy',
  start: {
    alts: [
      {
        value: { d: '1809' },
        cites: [
          {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1917' },
        cites: [
          {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 3,
  partOf: [
    {
      ref: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1809' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1917' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Porvoon_valtiop%C3%A4iv%C3%A4t_1809_by_Emanuel_Thelning.jpg/1280px-Porvoon_valtiop%C3%A4iv%C3%A4t_1809_by_Emanuel_Thelning.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Porvoon_valtiop%C3%A4iv%C3%A4t_1809_by_Emanuel_Thelning.jpg',
    credit: {
      institution: 'Pinx – maalaustaide Suomessa (Weilin+Göös, 2001)',
      creator: 'Emanuel Thelning'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Russia planned at first to annex Finland directly as a province of the Russian Empire, but in order to overcome the Finns\' misgivings about Russian rule, Tsar Alexander I offered them the following solution. Finland was not annexed to the Russian Empire but was joined to Russia instead through the person of the tsar. In addition, Finland was made an autonomous state--the Grand Duchy of Finland--with its inherited traditions intact.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/finland/10.htm' }
        },
        {
          id: 'q2',
          text: 'Imperial assurances that Finland would be autonomous and that its traditions would be respected were encoded in two 1809 decrees that constituted for the Finns the basis of their relationship with Russia. The Finnish Diet that met at Porvoo (Swedish, BorgA) in 1809 seconded the tsar\'s decrees.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'THE RUSSIAN GRAND DUCHY OF FINLAND, 1809-1917', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/finland/10.htm' }
        },
        {
          id: 'q3',
          text: 'He was also the limited monarch of Finland, which had been annexed in 1809 and awarded autonomous status.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
