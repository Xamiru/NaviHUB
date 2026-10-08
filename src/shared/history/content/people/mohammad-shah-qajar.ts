import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-shah-qajar',
  names: [
    { text: 'Mohammad Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'محمدشاه قاجار', lang: 'fa', role: 'native' },
    {
      text: 'Moḥammad Mirzā',
      lang: 'fa-Latn',
      role: 'former',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1808-01-05' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1848-09-05' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-calmard-mohammad-shah',
        loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-calmard-mohammad-shah',
        loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Persia',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1834-11-09' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1848-09-05' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
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
          text: 'MOḤAMMAD SHAH QĀJĀR, (b. Tabriz, 6 Ḏu’l-qaʿda 1222/5 January 1808; d. Tehran, 6 Šawwāl 1264/5 September 1848), the third ruler of the Qajar dynasty after his grandfather Fatḥ-ʿAli Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Early life. Moḥammad Mirzā (till his accession in 1834) was the eldest of ʿAbbās Mirzā‘s twenty five sons.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'In his childhood and youth, Moḥammad Mirzā appears as a taciturn, timid boy with no obvious political ambition.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q4',
          text: 'From 1824, Ḥāji Mirzā Aqāsi was appointed chief tutor to several ʿAbbās Mirzā’s sons and, soon afterward, to Moḥammad Mirzā. By the age of twenty, Moḥammad Mirzā was completely devoted to Āqāsi and his Sufi teachings.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Moḥammad Shah suffered from recurrent attacks of gout (neqres).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q6',
          text: 'His poor health accounts for the influence exerted on him by both Qāʾem Maqam II and Āqāsi.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q7',
          text: 'Russia and Britain political influence led to their progressive domination over Persian trade.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Compared to Fatḥ-ʿAli Shah’s prestigious appearance, Moḥammad Shah’s semi-Europeanized dress and short beard clearly denoted a change in the Qajar royal image (Amanat, 1997, p. 18).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q9',
          text: 'Although Persian historians mentioned him with the usual Qajar titles and honorifics, such as “ḵāqān son of ḵāqān” (Amanat, 1997, p. 10), he is mostly referred to and praised as “Moḥammad Shah-e Ḡāzi” or “pādešāh-e ḡāzi” for his courageous fights against the Russians.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    credit: { creator: 'Muhammad Hasan Afshar' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'nateq-1988-iran-dar-rahyabi-ye-farhangi', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' }
  ]
})
