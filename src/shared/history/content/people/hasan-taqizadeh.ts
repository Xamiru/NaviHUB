import { definePerson } from '../../schema'

export default definePerson({
  id: 'hasan-taqizadeh',
  names: [
    { text: 'Hasan Taqizadeh', lang: 'en', role: 'primary' },
    { text: 'سید حسن تقی‌زاده', lang: 'fa', role: 'native' },
    { text: 'Sayyed Ḥasan Taqizāda', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1878-09-27' },
        cites: [
          {
            source: 'iranica-taqizadeh-sayyed-hasan',
            loc: { section: 'TAQIZADEH, SAYYED ḤASAN', para: '1' }
          },
          {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '-1'
            }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1970-01-28' },
        cites: [
          {
            source: 'iranica-taqizadeh-sayyed-hasan',
            loc: { section: 'TAQIZADEH, SAYYED ḤASAN', para: '1' }
          },
          {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '-1'
            }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-taqizadeh-sayyed-hasan',
        loc: { section: 'TAQIZADEH, SAYYED ḤASAN', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-taqizadeh-sayyed-hasan',
        loc: { section: 'TAQIZADEH, SAYYED ḤASAN', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'diplomat', 'scholar'],
  offices: [
    {
      title: 'president of the Senate',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1950' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1950' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1950' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Seyyed_Hassan_Taqizadeh.jpg/1280px-Seyyed_Hassan_Taqizadeh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Seyyed_Hassan_Taqizadeh.jpg',
    credit: { institution: 'Kaveh' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'TAQIZADEH (Taqizāda), SAYYED ḤASAN (b. Tabriz, 30 Ramażān 1295/27 September 1878; d. Tehran, 8 Bahman 1348/28 January 1970), distinguished statesman, constitutionalist, and scholar.',
          lang: 'en',
          cite: {
            source: 'iranica-taqizadeh-sayyed-hasan',
            loc: { section: 'TAQIZADEH, SAYYED ḤASAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/taqizadeh-sayyed-hasan-parent/'
          }
        },
        {
          id: 'q2',
          text: '1906 Sayyed Ḥasan Taqizādeh is elected to the first Majles, soon becoming a leader of the Majles and growing famous on account of his reformist radical and passionate speeches.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1906' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'In 1898, Taqizadeh began to teach physics at Moẓaffari Dār-al-Fonun.',
          lang: 'en',
          cite: {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/taqizadeh-sayyed-hasan-01/'
          }
        },
        {
          id: 'q4',
          text: 'In 1901 Taqizadeh, together with Tarbiat and Abu’l-Żiāʾ Šabestari, founded a school in Tabriz for teaching new sciences and foreign languages, and issued a printed announcement for enrollment.',
          lang: 'en',
          cite: {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/taqizadeh-sayyed-hasan-01/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'An ardent nationalist, Taqizadeh opposed the Anglo-Russian Convention of 1907, which established Russian and British spheres of influence in Iran. In protest, he took sanctuary (bast) in the British embassy alongside thousands of other opponents of the agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '31'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/taqizadeh-sayyed-hasan-01/'
          }
        },
        {
          id: 'q6',
          text: 'After twenty-five days and some negotiation between the British embassy, the royal court, and the government, it was agreed that Taqizadeh, Dehḵodā, and a few others should be banished to a foreign country for one and a half years',
          lang: 'en',
          cite: {
            source: 'iranica-afshar-taqizadeh-constitutional-revolution',
            loc: {
              section: 'TAQIZADEH, SAYYED ḤASAN i. To the end of the Constitutional Revolution',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/taqizadeh-sayyed-hasan-01/'
          }
        },
        {
          id: 'q7',
          text: '1916 Sayyed Ḥasan Taqizādeh launches the influential journal Kāveh, in Berlin, Germany.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1916' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q8',
          text: '1925 Majles approves the deposing of Aḥmad Shah. Those who oppose this move as unconstitutional include Sayyed Ḥasan Taqizādeh, Moḥammad Moṣaddeq, Ḥosayn ʿAlā, and Sayyed Ḥasan Modarres.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1925' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q9',
          text: '1945 On December 30, on the last day prior to prime minister Ebrāhim Ḥakimi’s resignation, Sayyed Ḥasan Taqizādeh, the Iranian ambassador to London, submits a complaint to the Security Council of the United Nations against Russia, whose forces had remained in Iran contrary to a prior agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1945' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q10',
          text: '1950 Establishment of the Senate as the upper house of the Majles, and the election of Sayyed Ḥasan Taqizādeh as its president.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1950' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'safai-1963-rahbaran-e-mashruteh', perspective: 'iranian' },
    { source: 'kasravi-1940-tarikh-e-mashruteh-ye-iran', perspective: 'iranian' }
  ]
})
