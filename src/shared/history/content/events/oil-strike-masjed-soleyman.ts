import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'oil-strike-masjed-soleyman',
  names: [
    { text: 'Oil strike at Masjed Soleyman', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1908-05-26' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    { ref: 'place:masjed-soleyman' }
  ],
  related: [
    {
      ref: 'event:anglo-persian-oil-company-formation',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The specific well location, Masjed-e Soleymān, was named after a nearby fire temple.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'Shortly after 4.00 A.M. on the 26th of May 1908, a gusher of petroleum, rising perhaps fifty feet above the top of the drilling rig, was smothering the drillers and oil had been at last struck in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q3',
          text: 'Excavation of oil at Masjed-e Solaymān.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1908' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
