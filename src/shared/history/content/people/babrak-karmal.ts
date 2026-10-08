import { definePerson } from '../../schema'

export default definePerson({
  id: 'babrak-karmal',
  names: [
    { text: 'Babrak Karmal', lang: 'en', role: 'primary' },
    { text: 'ببرک کارمل', lang: 'fa', role: 'native', translit: 'Babrak Kārmal' }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1929' },
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
        value: { d: '1996-12-03' },
        cites: [
          {
            source: 'lc-names-n82115754',
            loc: { section: '670: Universalis.fr, via www, 20 May 2016' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'Deputy Prime Minister of the Democratic Republic of Afghanistan',
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
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        }
      ]
    },
    {
      title: 'President of the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1979-12-27' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1986-11' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
        },
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Babrak_Karmal_%28enhanced%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Babrak_Karmal_(enhanced).png',
    credit: { institution: 'Afghan newspaper (published before 1973; enhanced version)' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Parcham\'s leader, Babrak Karmal, and Amin were named deputy prime ministers.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1967 the PDPA split into two factions: the Parchamists, led by Babrak Karmal (who supported Daoud), and the “Khalqis” led by Noor Taraki.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q3',
          text: 'In June and July 1978 most leading Paṛčamīs were sent abroad as ambassadors: Kārmal to Czechoslovakia; Rātebzād to Yugoslavia; Najīb-Allāh, a twice-jailed activist under the monarchy and a future chief of the secret police, to Persia; Maḥmūd Baryālay (Kārmal’s stepbrother) to Pakistan; Nūr-Aḥmad Nūr, a former official in the Ministry of foreign affairs and member of parliament, to the United States; and ʿAbd-al-Wakīl, also formerly in the Ministry of foreign affairs, to the United Kingdom.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q4',
          text: 'The six former Paṛčamī ambassadors who had escaped to the Soviet Union returned with the invaders and took control of the party and the state under the leadership of Kārmal.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q5',
          text: 'To ensure that the changes instituted by the new regime would survive, the Soviet army intervened on 6 Jadī 1358 Š./27 December 1979 by deposing the Amīn government, which had ruled by terror, and installing members of Paṛčam, led by Babrak Kārmal (born 1308 Š./1929).',
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
    }
  ]
})
