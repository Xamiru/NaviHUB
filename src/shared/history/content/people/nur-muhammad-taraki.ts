import { definePerson } from '../../schema'

export default definePerson({
  id: 'nur-muhammad-taraki',
  names: [
    { text: 'Nur Muhammad Taraki', lang: 'en', role: 'primary' },
    { text: 'نور محمد تره کی', lang: 'fa', role: 'native', translit: 'Nūr Moḥammad Tarakī' },
    {
      text: 'Noor Taraki',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '3'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1917' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1979-10-08', notAfter: '1979-10-09' },
        cites: [
          {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '16' }
          },
          {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '6'
            }
          }
        ]
      },
      {
        value: { d: '1979-09' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician', 'revolutionary', 'writer'],
  offices: [
    {
      title: 'General Secretary of the People’s Democratic Party of Afghanistan',
      start: {
        alts: [
          {
            value: { d: '1978-04' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        },
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
        }
      ]
    },
    {
      title: 'President of the Revolutionary Council of the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1978-04' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-09' },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '16' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        }
      ]
    },
    {
      title: 'Prime Minister of the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1978-04' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-03' },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Nur_Muhammad_Taraki_official_portrait_%28restored%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Nur_Muhammad_Taraki_official_portrait_(restored).png',
    credit: {
      institution: 'Zhwandoon magazine, 1970 (published anonymously; restored by Roman Kubanskiy)'
    },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Democratic Republic of Afghanistan was proclaimed and a revolutionary council was put in place with Nūr Moḥammad Tarakī at its head. A Ḡilzay of rural and provincial background, he was born in 1296 Š./1917 and served as a low-level civil servant, acquiring a certain notoriety for his literary output with its rather lifeless realism. He founded the People’s Democratic Party of Afghanistan and remained its secretary general.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q8',
          text: 'The "Saur Revolution," as the new government grandiloquently labeled its coup d\'etat (after the month in the Islamic calendar in which it occurred), was almost entirely the achievement of the Khalq faction of the PDPA.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q2',
          text: 'Moreover, they were led by the erratic Muhammad Taraki, a poet, sometime minor official, and a publicly notorious radical.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q3',
          text: 'Taraki became president, prime minister and General Secretary of the PDPA.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q4',
          text: 'Amīn became premier in late March and had replaced Tarakī as minister of defense by July.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q5',
          text: 'Although Tarakī was still technically chief of state, he was becoming a figurehead',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q6',
          text: 'On 19 Sonbola/10 September, returning from a trip to Havana for a conference of nonaligned nations, Tarakī stopped in Moscow, where the Soviets arranged a reconciliation with Kārmal. With plans to depose and arrest Amīn and to establish a new coalition government of representatives from Paṛčam and Ḵalq, Tarakī returned to Kabul the next day, only to discover that Amīn had already learned of the plot and taken preemptive action.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Tarakī was arrested; Amīn, after detecting no Soviet objection to his assumption of all the former titles of the “Great Leader,” ordered two security officers to suffocate Tarakī with pillows on the night of 16-17 Mīzān/8-9 October.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        }
      ]
    }
  ]
})
