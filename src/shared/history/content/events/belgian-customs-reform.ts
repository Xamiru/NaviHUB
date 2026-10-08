import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'belgian-customs-reform',
  names: [
    { text: 'Belgian reform of the Persian customs', lang: 'en', role: 'primary' },
    { text: 'اصلاح گمرکات به دست بلژیکی‌ها', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1898' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1898' }
          },
          {
            source: 'iranica-destree-belgian-iranian-relations',
            loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '1' }
          },
          {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '22'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '22'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-destree-belgian-iranian-relations',
          loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mozaffar-al-din-shah' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      name: 'Joseph Naus',
      role: 'leader',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1898' }
        },
        {
          source: 'iranica-destree-belgian-iranian-relations',
          loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '2' }
        }
      ]
    },
    {
      ref: 'person:amin-al-dowleh',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-farmayan-amin-al-dawla',
          loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In the mid-1890s, receipts from customs amounted to some 20 percent of the total income of the central government, and, with the growth of Iran’s foreign trade, its absolute and relative contribution to the central budget was expected to rise. Against this background, the British and Russian governments and the foreign banks that were asked to furnish loans to the central government demanded custom receipts as collateral for the loans.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        },
        {
          id: 'q2',
          text: 'Persia, Russia, and England, equally anxious not to introduce into the Persian civil service officials from powerful and expan­sive countries, preferred to employ Belgians.',
          lang: 'en',
          cite: {
            source: 'iranica-destree-belgian-iranian-relations',
            loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/belgian-iranian-relations'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: '1898 Joseph Naus, the Belgian financial advisor, and his team arrive in Tehran to modernize customs administration and increase its revenues.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1898' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'Indeed, the uniqueness of these relations is owing to the fact that, from 1898 until the eve of World War II, Belgium “lent” to Persia a relatively large number of officials, whose task was to organize or reorganize various administrative departments of the latter country.',
          lang: 'en',
          cite: {
            source: 'iranica-destree-belgian-iranian-relations',
            loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/belgian-iranian-relations'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Joseph Naus, the highest-ranking of the three Belgian officials, was so energetic that in a short time he obtained very encouraging results.',
          lang: 'en',
          cite: {
            source: 'iranica-destree-belgian-iranian-relations',
            loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/belgian-iranian-relations'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The results of these reforms in fiscal terms were quite remarkable.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        },
        {
          id: 'q7',
          text: 'Far more than the tobacco concession, the customs reforms shattered the foundations of the business environment that enabled the tojjār to grow and prosper.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        },
        {
          id: 'q8',
          text: 'Their leader, Joseph Naus, succumbed to attacks mounted by the Constitutionalists and the British and was forced to leave Persia in the aftermath of the revolution and the installation of a parliamentary regime (see MAE 2981.VI-VII; and Browne, 1910, p. 137; for the typical, unfavorable view of Belgian officials in Persian sources, see Kasrawī, Mašrūṭa3, and Tārīḵ-ebīdārī, ed. Saʿīdī Sīrjānī, indices, s.v. Nūz).',
          lang: 'en',
          cite: {
            source: 'iranica-destree-belgian-iranian-relations',
            loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/belgian-iranian-relations'
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
            value: { d: '1898-01' },
            cites: [
              {
                source: 'iranica-gilbar-qajar-big-merchants',
                loc: {
                  section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In January 1898, senior Belgian customs officials were invited by the government to reform the customs administration, and between that year and 1904 the system underwent fundamental changes.',
        lang: 'en',
        cite: {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '22'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-03-15' },
            cites: [
              {
                source: 'iranica-destree-belgian-iranian-relations',
                loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The first three Belgian officials arrived at Tehran on March 15, 1898 (MAE 2981.I-III).',
        lang: 'en',
        cite: {
          source: 'iranica-destree-belgian-iranian-relations',
          loc: { section: 'BELGIAN-IRANIAN RELATIONS', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/belgian-iranian-relations'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/19_phot._de_Perse_par_E._Pirou%2C_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:19_phot._de_Perse_par_E._Pirou,_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    credit: { creator: 'Eugène Pirou' },
    license: { id: 'public-domain' }
  }
})
