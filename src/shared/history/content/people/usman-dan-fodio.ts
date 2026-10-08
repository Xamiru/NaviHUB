import { definePerson } from '../../schema'

export default definePerson({
  id: 'usman-dan-fodio',
  names: [
    { text: 'Usman dan Fodio', lang: 'en', role: 'primary' },
    { text: 'عثمان بن فودي', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1817' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['cleric', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Prominent among these radical mallams was Usman dan Fodio, who with his brother and son, attracted a following among the clerical class.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q2',
          text: 'When Usman dan Fodio died in 1817, he was succeeded by his son, Muhammad Bello.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    }
  ]
})
