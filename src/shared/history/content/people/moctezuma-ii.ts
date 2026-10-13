import { definePerson } from '../../schema'

export default definePerson({
  id: 'moctezuma-ii',
  names: [
    { text: 'Moctezuma II', lang: 'en', role: 'primary' },
    {
      text: 'Montezuma',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1480', approx: true },
        cites: [
          {
            source: 'loc-name-authority-montezuma-ii-emperor-of-mexico',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1520' },
        cites: [
          {
            source: 'loc-name-authority-montezuma-ii-emperor-of-mexico',
            loc: { section: 'MARC field 046: death date' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Aztec emperor',
      polity: 'polity:aztec-empire',
      end: {
        alts: [
          {
            value: { d: '1520' },
            cites: [
              {
                source: 'loc-name-authority-montezuma-ii-emperor-of-mexico',
                loc: { section: 'MARC field 046: death date' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '2' }
        },
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Moctezuma_Xocoyotzin_Newberry.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Moctezuma_Xocoyotzin_Newberry.jpg',
    credit: { institution: 'Newberry Library', creator: 'Unknown' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Cortes here learned that the native sovereign was called Montezuma; that he reigned over an extensive empire, which had lasted for three centuries; that thirty vassals, called caciques, obeyed him; and that his riches were immense and his power absolute.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        },
        {
          id: 'q2',
          text: 'Montezuma soon was arrested, and the Spanish took control of Tenochtitlán.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In this war we first meet with the Aztec name Moteuczoma, afterwards so famous in its Spanish form Montezuma.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        },
        {
          id: 'q4',
          text: 'The Aztec chieftains staged a revolt, however, and the Spanish were forced to retreat to the east.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Montezuma perished in attempting to address his revolted subjects; the latter, having chosen a new emperor, attacked the headquarters of Cortes with the utmost fury, and, in spite of the advantage of firearms, forced the Spaniards to retire, as the only means of escaping destruction.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    }
  ]
})
