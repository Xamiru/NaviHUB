import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'subjugation-of-sheikh-khazal',
  names: [
    { text: 'Subjugation of Sheikh Khazal', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1924-11-04' },
        cites: [
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '31' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1925-04-18' },
        cites: [
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '37' }
          }
        ]
      },
      {
        value: { d: '1924-04-19' },
        cites: [
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:ahvaz',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '34' } }
      ]
    },
    {
      ref: 'place:khorramshahr',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '36' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'commander',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '31' } }
      ]
    },
    {
      ref: 'person:sheikh-khazal',
      role: 'leader',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '29' } }
      ]
    },
    {
      name: 'Fażl-Allāh Zāhedi',
      role: 'commander',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '36' } }
      ]
    },
    {
      name: 'Percy Loraine',
      role: 'diplomat',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '31' } },
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '9' }
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
          text: 'Reżā Khan knew perfectly well that Ḵazʿal and his secessionist tendencies were a major obstacle to his ambitious plan for creating a united country under a strong central government.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q2',
          text: 'Thus, in addition to establishing close ties with some members of the opposition in the Majles (especially Sayyed Ḥasan Modarres) who were wary of Reżā Khan’s future plans, he also forged an alliance with some powerful local chiefs (e.g., Amir Mojāhed Baḵtiāri of Lorestan and the governor of Pošt-kuh) and called it Komita-ye qiām-e saʿādat.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Reżā Khan divests Shaikh Ḵazʿal, de facto ruler of Khuzestan, of all power, reclaiming the region and discarding a major hurdle of Iranian territorial integrity.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1924' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'In 1924 he broke the power of Shaykh Khazal, who was a British protégé and practically autonomous in Khuzestan.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Upon entering the palace, Ḵazʿal fell to the ground, kissing Reżā Khan’s feet.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q6',
          text: 'Two weeks after this meeting, government troops were in full control of the whole province, and General Fażl-Allāh Zāhedi, who had led the government troops against Ḵazʿal forces and his allies, was appointed the military commander and governor of the province (Reżā Shah, p. 204; Kasravi, 1956, p. 227), which officially reverted to its original name, Khuzestan',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
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
            value: { d: '1924-11-04' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On 4 November 1924, Reżā Khan left Tehran for Isfahan and made the finance minister, Moḥammad-ʿAli Foruḡi, the acting premier',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '31' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924-12-06' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '35' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Reżā Khan met Ḵazʿal on 6 December 1924 (9 Jomādā I 1343).',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '35' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924-12-19' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 19 December 1924, Reżā Khan signed a document that pardoned the Shaikh and assured him that his private properties and lands would be respected and neither he nor his relatives would be harmed',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '36' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1925-04-18' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '37' }
              }
            ]
          },
          {
            value: { d: '1924-04-19' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'So, at Reżā Khan’s secret instruction to Zāhedi, in the middle of the night on 18 April 1925, when everybody on the ship was drunk and being entertained by dancers and musicians, in a commando-style raid, army men boarded the ship and captured Ḵazʿal',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '37' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Reza_Khan_in_Tehran_after_supressing_Sheikh_Khazal_rebellion.png',
    page: 'https://commons.wikimedia.org/wiki/File:Reza_Khan_in_Tehran_after_supressing_Sheikh_Khazal_rebellion.png',
    credit: { institution: '28 hezar ruz-e tarikh-e Iran va jahan (Ettelaat, 2002)' },
    license: { id: 'public-domain' }
  }
})
