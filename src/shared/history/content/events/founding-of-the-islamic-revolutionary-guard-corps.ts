import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-islamic-revolutionary-guard-corps',
  names: [
    { text: 'Founding of the Islamic Revolutionary Guard Corps', lang: 'en', role: 'primary' },
    { text: 'تأسیس سپاه پاسداران انقلاب اسلامی', lang: 'fa', role: 'native' },
    {
      text: 'Pasdaran',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1979-05-05' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '8' }
        }
      ]
    },
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '5' }
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
          text: 'In May 1979 Khomeini authorized the establishment of the Pasdaran (Pasdaran-e Enghelab-e Islami, Islamic Revolutionary Guard Corps or Revolutionary Guards).',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q2',
          text: 'The Pasdaran was conceived by the men around Khomeini as a military force loyal to the Revolution and the clerical leaders, as a counterbalance for the regular army, and as a force to use against the guerrilla organizations of the left, which were also arming.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/23.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Because the Bazargan government lacked the necessary security forces to control the streets, such control passed gradually into the hands of clerics in the Revolutionary Council and the IRP, who ran the revolutionary courts and had influence with the Pasdaran, the revolutionary committees, and the club-wielding hezbollahis, or "partisans of the party of God."',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/23.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Disturbances among the ethnic minorities accelerated the expansion of the Pasdaran.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q5',
          text: 'In the northwestern provinces the Revolutionary Guards and the army were engaged in heavy fighting with the Kurds.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q6',
          text: 'Bani Sadr failed to secure the dissolution of the Pasdaran and the revolutionary courts and committees.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q7',
          text: 'Iraq did not succeed in quickly defeating the Iranian armed forces, although it had a larger air force and army. One reason was that the Iranians, although surprised by the invasion, immediately mustered a strong resistance, consisting of a combination of regular army, police, Revolutionary Guards, and volunteer units.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Pasdaran and specially recruited gangs of hezbollahis patrolled urban neighborhoods, ostensibly looking for the safe houses in which supporters of the Mojahedin and other opposition groups were suspected of hiding.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Reign of Terror', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/92.htm' }
        },
        {
          id: 'q9',
          text: 'The government responded to the armed challenge of the guerrilla groups by expanded use of the Pasdaran in counterintelligence activities and by widespread arrests, jailings, and executions.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1979-05-05' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Ayatollah Khomeini orders the formation of the Revolutionary Guards (Sepāh-e pāsdārān).',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-10' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In October 1980, Khomeini combined the forces of the regular army and the Revolutionary Guards, and appointed a seven-member Supreme Defense Council',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-09-27' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On September 27, the Mojahedin used machine guns and rocket-propelled grenade launchers against units of the Pasdaran.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/26.htm' }
      }
    }
  ]
})
