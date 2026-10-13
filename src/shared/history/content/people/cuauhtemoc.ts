import { definePerson } from '../../schema'

export default definePerson({
  id: 'cuauhtemoc',
  names: [
    { text: 'Cuauhtémoc', lang: 'en', role: 'primary' },
    {
      text: 'Guatemozin',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '322' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1495', approx: true },
        cites: [
          {
            source: 'loc-name-authority-cuauhtemoc-emperor-of-mexico',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1525' },
        cites: [
          {
            source: 'loc-name-authority-cuauhtemoc-emperor-of-mexico',
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
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cuauht%C3%A9moc.png',
    page: 'https://commons.wikimedia.org/wiki/File:Cuauht%C3%A9moc.png',
    credit: { creator: 'Anonymous' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The last emperor, Cuauhtémoc, was captured and killed.',
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
          id: 'q2',
          text: 'Guatemotzin, who had been recognized as emperor, and a great number of caciques, accused of having conspired against the conquerors, were publicly executed, with circumstances of great cruelty, by order of Cortes.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'In the nineteenth century, the legend of Cuauhtémoc would be revived, and the last Aztec emperor would be considered a symbol of honor and courage, the first Mexican national hero.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    }
  ]
})
