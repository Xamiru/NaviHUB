import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'lesser-autocracy',
  names: [
    { text: 'Lesser Autocracy', lang: 'en', role: 'primary' },
    { text: 'استبداد صغیر', lang: 'fa', role: 'native', translit: 'estebdād-e ṣaḡīr' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1908-06' },
        cites: [
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
          },
          {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1909-07' },
        cites: [
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
          },
          {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The shelling of the Majles leads to the re-establishment of arbitrary rule by Moḥammad-ʿAli Shah.',
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
        },
        {
          id: 'q2',
          text: 'But it was during the eleven months of civil war (Jomādā I 1326 – Rabiʿ II 1327/June 1908 – July 1909) that he achieved fame not only in Tabriz, but also in the entire country and beyond.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    }
  ]
})
