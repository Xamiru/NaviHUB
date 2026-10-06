import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'us-act-prohibiting-importation-of-slaves',
  names: [
    { text: 'Act Prohibiting Importation of Slaves (1807)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1807-03-02' },
        cites: [
          {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'subsaharan-africa'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'That from and after the first day of January, one thousand eight hundred and eight, it shall not be lawful to import or bring into the United States or the territories thereof from any foreign kingdom, place, or country, any negro, mulatto, or person of colour, with intent to hold, sell, or dispose of such negro, mulatto, or person of colour, as a slave, or to be held to service or labour.',
          lang: 'en',
          cite: {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sl004.asp'
          }
        },
        {
          id: 'q2',
          text: 'APPROVED, March 2, 1807.',
          lang: 'en',
          cite: {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sl004.asp'
          }
        }
      ]
    }
  ]
})
