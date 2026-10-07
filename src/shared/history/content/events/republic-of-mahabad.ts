import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'republic-of-mahabad',
  names: [
    { text: 'Republic of Mahabad', lang: 'en', role: 'primary' },
    { text: 'جمهوری مهاباد', lang: 'fa', role: 'native' },
    {
      text: 'Kurdish Republic',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    },
    {
      text: 'Kurdish Autonomous Republic',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1945-12-15' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
          }
        ]
      },
      {
        value: { d: '1946-01' },
        cites: [
          {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1946-12-15' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:mahabad',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:qazi-muhammad',
      role: 'leader',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        },
        { source: 'iranica-ziai-qazi-mohammad', loc: { section: 'QAZI, Mohammad', para: '3' } }
      ]
    },
    {
      name: 'Mollā Moṣṭafā Bārzānī',
      role: 'commander',
      cites: [
        { source: 'iranica-behn-barzani', loc: { section: 'BĀRZĀNĪ', para: '5' } },
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:azerbaijan-peoples-government',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    },
    { ref: 'event:iran-crisis-of-1946', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'With the backing of the Soviet army, Qāzi Moḥam-mad claims Kurdistan as an autonomous Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1945' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'In a similar move, activists in neighboring Kordestan established the Kurdish Republic of Mahabad.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q3',
          text: 'The Republic of Kurdistan set up in Mahābād, south of Lake Urmiya, instigated by the Soviets, was another reason for Persian government worry.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In western Azarbaijan, the Soviet commander at Mīāndoāb summoned the Kurdish chieftains and transported them to Baku in southern Russia. There, in late September, 1945, the Prime Minister of the Azarbaijan SSR told them that neither their own nationalist party, the Komala-ye Žīān-e Kordestān, nor the Tūda Party was looked on favorably, that they should seek their goals within Azarbaijani autonomy, and that they should call themselves the Democratic Party of Kurdistan (Ḥezb-e Demokrāt-e Kordestān;',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q5',
          text: 'the Kurds opposed, among other things, the government’s attempts at detribalization.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'After having failed to reach an agreement with the Iranian government concerning political asylum, Mollā Moṣṭafā and his armed followers rallied to the emerging army of the Mahābād Republic (an autonomist Kurdish movement centered in Mahābād), where he was made one of four generals.',
          lang: 'en',
          cite: { source: 'iranica-behn-barzani', loc: { section: 'BĀRZĀNĪ', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/barzani-the-name-of-a-kurdish-tribe-from-barzan-a-town-in-the-former-hakkari-bahdinan-territory-of-northeastern-iraq/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Two days later, on December 15, Qāżī Moḥammad announced the surrender of Mahābād.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q8',
          text: 'The collapse of the Kurdish Republic in December, 1946, marked the beginning of a twelve-year uneventful asylum in the Soviet Union which he reached after a forced march with a small band of followers.',
          lang: 'en',
          cite: { source: 'iranica-behn-barzani', loc: { section: 'BĀRZĀNĪ', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/barzani-the-name-of-a-kurdish-tribe-from-barzan-a-town-in-the-former-hakkari-bahdinan-territory-of-northeastern-iraq/'
          }
        },
        {
          id: 'q9',
          text: 'Qāżi Moḥammad (1893-1947), founder of the Kurdish Democratic Party and head of the Republic of Mahābād, who was executed by hanging in 1947',
          lang: 'en',
          cite: {
            source: 'iranica-ziai-qazi-mohammad',
            loc: { section: 'QAZI, Mohammad', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qazi-mohammad/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Republic_of_Mahabad_-_Tehran_Mosavar_1947_April_-_2.jpg/1280px-Republic_of_Mahabad_-_Tehran_Mosavar_1947_April_-_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Republic_of_Mahabad_-_Tehran_Mosavar_1947_April_-_2.jpg',
    credit: { institution: 'Tehran Mosavvar (April 1947)' },
    license: { id: 'public-domain' }
  }
})
