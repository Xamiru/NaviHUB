import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-hostage-crisis-embassy-seizure',
  about: ['event:iran-hostage-crisis'],
  topic: 'motives',
  positions: [
    {
      id: 'students-outrage-at-the-shahs-admission',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Muslim Students Following the Line of the Imam' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'would have world-wide repercussions and would allow them [students] to express their outrage against the U.S. and the shah’s admission',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'second-revolution-and-den-of-spies',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'war between Islam and blasphemy',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q3',
          text: 'Iran’s second revolution, more important than the first one',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q4',
          text: 'a second revolution, greater than the first',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '67' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ],
      reception: [
        {
          id: 'q14',
          text: 'The Iranian regime exploited the crisis to divert national attention from the debate over the draft constitution.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q15',
          text: 'While the released documents were authentic, the militants did not publish all of them, particularly those that showed the contacts between some clerics and U.S. officials in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'american-plots-since-the-coup',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The conflict between the Iranian nation and the U.S. began on the 28th of Mordad (the coup d’état in Iran) and even before that.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        },
        {
          id: 'q6',
          text: 'it hosted Mohammad Reza who was the definite enemy of the people of Iran.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        }
      ],
      reception: [
        {
          id: 'q16',
          text: 'Instead, the shah’s admission renewed bitter memories of the CIA-led 1953 coup d’état, in which the nationalist government of Moḥammad Moṣaddeq was overthrown and the shah’s rule reinstated',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q17',
          text: 'Many believed the U.S. was orchestrating a similar plan to restore the Pahlavi dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'unlawful-seizure-of-diplomats',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Jimmy Carter', ref: 'person:jimmy-carter' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'In the name of the American people, I ask that you release unharmed all Americans presently detained in Iran and those held with them and allow them to leave your country safely and without delay. I ask you to recognize the compelling humanitarian reasons, firmly based in international law, for doing so.',
          lang: 'en',
          cite: {
            source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
            loc: { section: 'Document 7. Letter From President Carter to Ayatollah Khomeini' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d7'
          }
        },
        {
          id: 'q8',
          text: 'The people of the United States desire to have relations with Iran based upon equality, mutual respect, and friendship.',
          lang: 'en',
          cite: {
            source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
            loc: { section: 'Document 7. Letter From President Carter to Ayatollah Khomeini' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d7'
          }
        }
      ],
      reception: [
        {
          id: 'q18',
          text: 'Iran defied the resolution, however, and refused to release the hostages; this caused the Carter Administration to threaten',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q19',
          text: 'Carter’s diplomacy did have some results; the United Nations, the International Court of Justice, the Arab League, the Western European counties, dozens of prominent religious leaders, including the pope, Nobel Peace Prize winner Sean MacBride, and many heads of state of Islamic countries called for the release of the hostages (see Bāqi, pp. 41-55; Ebtekar, pp. 85-87).',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'villainy-of-fanatics',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q9',
          text: 'On November 4, two weeks after my arrival in New York, militant fanatics in Teheran occupied the American embassy and seized more than fifty hostages. There is little I can say about that act of villainy, allegedly committed to “punish” the United States for offering me a medical haven.',
          lang: 'en',
          cite: { source: 'pahlavi-1980-answer-to-history', loc: { section: 'My Exile' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'instrument-of-consolidation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mohsen M. Milani' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'manipulated and prolonged the crisis in order to craft a new political landscape for Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q11',
          text: 'In the wise words of former hostage Barry Rosen, the hostage crisis was “closer to defeat for both sides”',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '61' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'pressure-to-end-american-interference',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Richard W. Cottam' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'Khomeini, it appeared, was holding American officials hostage in order to force the United States to cease its efforts to interfere in Persian affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-cottam-carter-administration',
            loc: { section: 'CARTER ADMINISTRATION', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/carter-administration-1977-81-policy-toward-persia/'
          }
        }
      ]
    },
    {
      id: 'fear-of-another-1953',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q13',
          text: 'Mindful of the Anglo-American Coup d’État of 1332 Š./1953 (q.v.) that had restored the shah to power and overthrown the government of Moḥammad Moṣaddeq, inaugurating a quarter-century of royal dictatorship, many in Iran now feared a recurrence.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '66' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
