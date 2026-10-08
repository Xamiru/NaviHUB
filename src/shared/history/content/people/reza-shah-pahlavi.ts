import { definePerson } from '../../schema'

export default definePerson({
  id: 'reza-shah-pahlavi',
  names: [
    { text: 'Reza Shah Pahlavi', lang: 'en', role: 'primary' },
    { text: 'رضاشاه پهلوی', lang: 'fa', role: 'native' },
    { text: 'Reza Khan', lang: 'en', role: 'former' },
    {
      text: 'sardār-e sepah',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1878' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1944' }
          },
          { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '181' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1944-07' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:mazandaran',
    cites: [
      {
        source: 'iranica-yarshater-iranian-history-islamic-period-5',
        loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)' }
      }
    ]
  },
  diedIn: {
    ref: 'place:johannesburg',
    cites: [
      {
        source: 'loc-iran-country-study-1987',
        loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'commander of the armed forces',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '5' }
        },
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '13' }
        }
      ]
    },
    {
      title: 'minister of war',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1921-04' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '28' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '28' } },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1921' }
        }
      ]
    },
    {
      title: 'prime minister',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1923-10-28' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '14' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1923' }
        }
      ]
    },
    {
      title: 'shah of Iran',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1925-12-12' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
              }
            ]
          },
          {
            value: { d: '1924-12-12' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '28' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1941-09-16' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1925' }
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
          text: 'Reza Khan was a brave and intelligent leader with a forceful personality, authoritarian temperament, and a keen insight into the country’s condition and the aspirations of its people.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'Reżā Khan was a Cossack officer of humble origins who, as a result of his forcefulness and military achievements, had been chosen by Major General Edmund Ironside, head of Norperforce (the British forces in northern Persia), to take charge of the Cossack unit stationed near Qazvīn',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q3',
          text: 'Even before he became shah, Reza Khan had taken steps to create a strong central government and to extend government control over the country. Now, as Reza Shah, with the assistance of a group of army officers and younger bureaucrats, many trained in Europe, he launched a broad program of change designed to bring Iran into the modern world.',
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'From this moment, Reżā Khan became the real power in Iran behind the making and unmaking of successive cabinets.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q5',
          text: 'The political history of Iran during the remaining four years of Aḥmad Shah’s reign is the story of the struggle for supremacy between a frightened, weak, and pleasure-loving monarch and an astute and powerful minister of war aspiring to the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'Reżā Shah is forced to abdicate in favor of his son, Crown Prince Moḥammad Reżā, 21, with the agreement of the Allies. Reżā Shah departs for the Maurice Islands, east of Madagascar, and later to Johannesburg, South Africa, along with some members of his family.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1941' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q7',
          text: 'Reza Shah knew the Allies would not permit him to remain in power, so he abdicated on September 16 in favor of his son, who ascended the throne as Mohammad Reza Shah Pahlavi.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q9',
          text: 'Reżā Shah had long been regarded by many of his compatriots as owing his position to a British engineered coup. Now his abdication, having been preceded by increasing denunciation of him in the BBC’s Persian broadcasts (see GREAT BRITAIN xiii. THE BBC) which had started in late December 1940 (relying heavily on material provided by the British Legation, and particularly by its press attaché Ann Lambton), and his subsequent exile, organized by British officials, were seen as a clear indication of the reassertion of British influence.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Reżā Shah (b. 1878) dies in Johannesburg, South Africa.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1944' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%D8%AF%D8%B1_%D8%A7%D9%88%D8%A7%DB%8C%D9%84_%D8%B3%D9%84%D8%B7%D9%86%D8%AA_-_%D8%AA%D8%B5%D9%88%DB%8C%D8%B1_%D9%85%D9%86%D8%AA%D8%B4%D8%B1%D8%B4%D8%AF%D9%87_%D8%AF%D8%B1_%DA%A9%D8%AA%D8%A7%D8%A8_%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%DA%A9%D8%A8%DB%8C%D8%B1_%DB%8C%D8%A7_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86_%D9%86%D9%88.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%D8%AF%D8%B1_%D8%A7%D9%88%D8%A7%DB%8C%D9%84_%D8%B3%D9%84%D8%B7%D9%86%D8%AA_-_%D8%AA%D8%B5%D9%88%DB%8C%D8%B1_%D9%85%D9%86%D8%AA%D8%B4%D8%B1%D8%B4%D8%AF%D9%87_%D8%AF%D8%B1_%DA%A9%D8%AA%D8%A7%D8%A8_%D8%B1%D8%B6%D8%A7%D8%B4%D8%A7%D9%87_%DA%A9%D8%A8%DB%8C%D8%B1_%DB%8C%D8%A7_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86_%D9%86%D9%88.jpg',
    credit: { institution: 'Grand Ayatollah Boroujerdi Library' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' }
  ]
})
