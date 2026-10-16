import { definePerson } from '../../schema'

export default definePerson({
  id: 'william-knox-darcy',
  names: [
    { text: 'William Knox D’Arcy', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  regions: ['iran', 'europe'],
  roles: ['businessperson'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'William Knox D’Arcy (q.v.), an English entrepreneur and financier who had made a fortune in gold mining in Australia',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'D’Arcy had no organization and no company, only a secretary to handle his business correspondence.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1849' },
        cites: [
          {
            source: 'loc-name-authority-william-knox-darcy',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1917' },
        cites: [
          {
            source: 'loc-name-authority-william-knox-darcy',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  }
})
