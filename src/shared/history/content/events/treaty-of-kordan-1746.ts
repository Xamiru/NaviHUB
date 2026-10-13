import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-kordan-1746',
  names: [
    { text: 'Treaty of Kordan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1746-09' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  sides: [
    {
      key: 'persia',
      name: 'Persia',
      polity: 'polity:afsharid-iran',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '16' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '16' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'signatory',
      side: 'persia',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '16' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:nader-shahs-coronation-1736',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '15' }
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
          text: 'After three more years of inconclusive warfare, Nāder agreed to drop the Jaʿfari maḏhab idea and concluded an agreement with the Ottomans in 1746 at Kordān.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Although Nāder’s victory led to new negotiations, his bargaining position was not strong because of new, large-scale domestic uprisings.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q3',
          text: 'Finally, the shah was forced to reinstate taxes due to insufficient funds, and the heavy levies sparked numerous rebellions.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Although Nāder was assassinated soon after this treaty was drawn up, its basic terms remained in effect even during later episodes of renewed conflict.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        },
        {
          id: 'q5',
          text: 'A process of diplomatic change that began in the era of Nāder resulted over the next several decades in the development of a new de jure framework for Ottoman-Persian relations.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1741' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In spite of mounting problems, in 1741 Nāder sent an embassy to the Ottomans to resubmit his 1736 proposal for a peace treaty.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1743' },
            cites: [
              {
                source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
                loc: {
                  section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS',
                  para: '15'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'After he had successfully carried out invasions of India and Turkistan over the next few years as well as suppressing rebels in Daghestan, Nāder again embarked on a campaign against the Ottomans, entering Iraq in 1743 and placing Mosul and Basra under siege.',
        lang: 'en',
        cite: {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1745-08' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'He resumed his war against the Ottomans and defeated them in August 1745 at Baḡāvard near Yerevan.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1746-09' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The treaty was signed in September 1746 in Kordān, northwest of Tehran. It made possible the official Ottoman recognition of Nāder’s rule, and the sultan dispatched an embassy with a huge assortment of gifts in the spring of 1747, although the shah did not live to receive it.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mahmud_I_by_John_Young.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmud_I_by_John_Young.jpg',
    credit: { creator: 'John Young' },
    license: { id: 'public-domain' }
  }
})
