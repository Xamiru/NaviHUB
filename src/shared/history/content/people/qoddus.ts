import { definePerson } from '../../schema'

export default definePerson({
  id: 'qoddus',
  names: [
    { text: 'Qoddus', lang: 'en', role: 'primary' },
    { text: 'قدوس', lang: 'fa', role: 'native' },
    { text: 'Moḥammad-ʿAli Bārforuši', lang: 'en', role: 'alternative' },
    { text: 'Quddus', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1822' },
        cites: [
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1849-05-16' },
        cites: [
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '1' } },
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '8' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:babol',
    cites: [
      { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '1' } }
    ]
  },
  diedIn: {
    ref: 'place:babol',
    cites: [
      { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '8' } }
    ]
  },
  regions: ['iran'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'QODDUS, Moḥammad-ʿAli Bārforuši (b. Bārforuš, 1238/1822; d. Bārforuš, 23 Jomādā II 1265/16 May, 1849), a prominent Bābi (see BABISM) figure who accepted the Bābi religion when still a young clergyman of 22 years and was later given the spiritual title “Qoddus” (lit. ‘absolutely holy’ or ‘the most holy’) by the Bāb.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In May 1844, Qoddus was in Shiraz, where he met the Bāb and gave his full allegiance to the Babi faith.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        },
        {
          id: 'q3',
          text: 'The Bāb chose Qoddus as his traveling companion for the pilgrimage to Mecca in 1844.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Mollā Saʿid Bārforuši, the Shiʿite religious leader of Bārforuš who was always jealous of Qoddus, finally managed to have Qoddus killed.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        },
        {
          id: 'q5',
          text: 'Qoddus’s tragic and public death at Bārforuš took place on 23 Jomādā II 1265/16 May 1849 (Zarandi, p. 408; Amanat, p. 188).',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'However, because of his piety, virtuous life, and unique understanding of the Bābi religion, Qoddus has been accorded the highest spiritual station in the Bābi community and recognized as second only to the Bāb himself (Shoghi Effendi, p. 49; Māzandarāni, 1944, pp. 419-21, 423-24).',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    }
  ]
})
