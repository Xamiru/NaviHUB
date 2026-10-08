import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'baghdad-pact',
  names: [
    { text: 'Baghdad Pact', lang: 'en', role: 'primary' },
    { text: 'پیمان بغداد', lang: 'fa', role: 'native' },
    {
      text: 'Central Treaty Organization',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kechichian-central-treaty-organization',
          loc: { section: 'CENTRAL TREATY ORGANIZATION (CENTO)', para: '1' }
        },
        {
          source: 'iranica-kechichian-baghdad-pact',
          loc: { section: 'BAGHDAD PACT', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1955-02-24' },
        cites: [
          {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'iran', 'south-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'iranica-kechichian-baghdad-pact',
          loc: { section: 'BAGHDAD PACT', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:kingdom-of-iraq' },
    { ref: 'polity:republic-of-turkey' },
    { ref: 'polity:pakistan' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '38' }
        }
      ]
    },
    {
      name: 'Nuri as Said',
      role: 'signatory',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '28' }
        }
      ]
    },
    {
      ref: 'person:gamal-abdel-nasser',
      role: 'participant',
      cites: [
        {
          source: 'iranica-kechichian-baghdad-pact',
          loc: { section: 'BAGHDAD PACT', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iraqi-revolution-of-1958',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-kechichian-baghdad-pact',
          loc: { section: 'BAGHDAD PACT', para: '3' }
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
          text: 'BAGHDAD PACT, popular name for the 1955 pro-Western defense alliance between Turkey, Iraq, Iran, Pakistan, and the United Kingdom.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q2',
          text: 'In 0ctober 1955, Iran joined the Baghdad Pact, which brought together the "northern tier" countries of Iraq, Turkey, and Pakistan in an alliance that included Britain, with the United States serving as a supporter of the pact but not a full member. (The pact was renamed the Central Treaty Organization--CENTO--after Iraq\'s withdrawal in 1958.)',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the height of the Cold War, the Middle East, with strategic bases bordering the Soviet Union, vital communications links, and significant oil wealth, represented a valuable region for Western interests. Initial attempts to align the emerging states in the area to Britain and the United States having failed (Anglo-Egyptian Treaty of 1936 and Anglo-Iraqi Treaty of 1930), London and Washington initiated a sequence of well-known agreements, including the treaty of “friendship and cooperation for security” between Turkey and Pakistan (2 April 1954); the “military assistance” understanding between Iraq and the U.S. (21 April 1954); the Turkish-Iraqi “mutual cooperation pact” (24 February 1955); the special agreement between Iraq and Britain (5 April 1955) which amalgamated the political-military bloc of pro-Western regimes into the Baghdad Pact (Khadduri, pp. 309-24).',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q4',
          text: 'This was the period of pacts directed against the Soviet Union. The North Atlantic Treaty Organization and Southeast Asia Treaty Organization were supposed to contain the Soviet Union in the west and east. The Baghdad Pact, bringing into alliance Britain, Turkey, Iran, Pakistan, and Iraq, was supposed to do the same on the Soviet Union\'s southern borders.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '14'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'The Pact’s purpose was the “maintenance of peace and security in the Middle East region” (Preamble) and called on member-states to “cooperate for their security and defense” (Article 1) and to “refrain from any interference whatsoever in each other’s internal affairs” (Article 3). “Open for accession to any member of the Arab League or any other slate actively concerned with the security and peace in this region” (Article 5), the American-engineered alliance was intended to satisfy several objectives (Europa, p. 102). It appealed to its members for very different reasons although the rising influence of the Soviet Union and that of Arab nationalism were widely shared.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q6',
          text: 'The shah had played a crucial role in Persia’s membership of the pro-Western Baghdad Pact of 1334 Š./1955 (renamed the Central Treaty Organization [q.v.] following the Iraqi revolution of July 1958), which had provoked considerable Soviet enmity but not, in the shah’s view, adequate Western commitment or assistance to Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The monarchy\'s major foreign policy mistake occurred in 1955, when Nuri as Said announced that Iraq was joining a British- supported mutual defense pact with Iran, Pakistan, and Turkey. The Baghdad Pact constituted a direct challenge to Egyptian president Gamal Abdul Nasser. In response, Nasser launched a vituperative media campaign that challenged the legitimacy of the Iraqi monarchy and called on the officer corps to overthrow it.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/20.htm' }
        },
        {
          id: 'q8',
          text: 'Iraq’s consequent withdrawal from the Pact, henceforth the Central Treaty Organization (CENTO), led to the transfer of the International Secretariat from Baghdad to Ankara, Turkey. In the wake of the Pact’s demise, the U.S. signed several defense treaties with Iran, Turkey, and Pakistan, guaranteeing their security against foreign aggression.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q9',
          text: 'Without the participa­tion of nationalist Arabs a defense pact associated with the West could not remain stable. After the Iraqi with­drawal in 1959, in spite of serious efforts, CENTO failed to secure the cooperation of any other Arab state (Hadley, pp. 3-4). This deprived the alliance of much of its significance, and one might say that its sword lacked a cutting edge.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-central-treaty-organization',
            loc: { section: 'CENTRAL TREATY ORGANIZATION (CENTO)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/central-treaty-organization-cento-a-mutual-defense-and-economic-cooperation-pact-among-persia-turkey-and-pakistan-wi/'
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
      quote: {
        id: 'q10',
        text: '1955 Iran joins the Baghdad Pact, with Iraq, Turkey, Pakistan, and the United Kingdom.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1955' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1959-08' },
            cites: [
              {
                source: 'iranica-kechichian-central-treaty-organization',
                loc: { section: 'CENTRAL TREATY ORGANIZATION (CENTO)', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The name change did not take effect until Šahrīvar 1338 Š./August 1959, when the United States became an associate member, signing a series of bilateral defense agreements with Iran, Turkey, and Pakistan.',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-central-treaty-organization',
          loc: { section: 'CENTRAL TREATY ORGANIZATION (CENTO)', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/central-treaty-organization-cento-a-mutual-defense-and-economic-cooperation-pact-among-persia-turkey-and-pakistan-wi/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Hossein_Ala%27%2C_Baghdad_Pact.png',
    page: 'https://commons.wikimedia.org/wiki/File:Hossein_Ala%27,_Baghdad_Pact.png',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  }
})
