import { definePerson } from '../../schema'

export default definePerson({
  id: 'ahmad-qavam',
  names: [
    { text: 'Ahmad Qavam', lang: 'en', role: 'primary' },
    { text: 'احمد قوام', lang: 'fa', role: 'native' },
    {
      text: 'Qawām-al-Salṭana',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1882' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1955' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1955' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1955' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1942' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1942' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1942' }
        }
      ]
    },
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1946' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1946' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
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
          text: 'Aḥmad Qawām (Qawām-al-Salṭana, b. 1882), prominent statesman who served five terms as premier and was instrumental in solving the Azarbaijan Crisis of 1946 as well as in promoting US-Iran relations, dies.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1955' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'Pressured by the Soviet Union for oil concession in the north of the country, the Majles gave a vote of confidence to Aḥmad Qawām-al-Salṭana in 1946, a mature and clever politician inherited from the Qajar period and in whose cabinet Reza Khan had once been a minister.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Aḥmad Qawām-al-Salṭana assumes the premiership. After four months, his opponents mobilize a bread riot in Tehran; the riots end in the pillaging of Majles, and the burning of stores and the residence of the prime minister, to which Qawām responds by closing all newspapers.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1942' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q4',
          text: 'Qawām-al-Salṭana forms the Ḥezb-e demokrāt-e Irān (Democratic Party of Iran) to bolster his political position vis-à-vis the Tudeh Party.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1946' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Ghavam_al-Saltaneh.jpg/1280px-Ghavam_al-Saltaneh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ghavam_al-Saltaneh.jpg',
    credit: { institution: 'The Strangling of Persia (W. Morgan Shuster, 1912)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'showkat-2007-dar-tirras-e-hadeseh', perspective: 'iranian' }
  ]
})
