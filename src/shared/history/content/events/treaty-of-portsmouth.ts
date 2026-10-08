import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-portsmouth',
  names: [
    { text: 'Treaty of Portsmouth', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1905-09' },
        cites: [
          {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '2'
            }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'russia-central-asia', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:portsmouth-new-hampshire',
      cites: [
        {
          source: 'state-dept-milestones-portsmouth',
          loc: {
            section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
            para: '2'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:russo-japanese-war' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:russian-empire' },
    { ref: 'polity:empire-of-japan' }
  ],
  participants: [
    {
      ref: 'person:theodore-roosevelt',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-portsmouth',
          loc: {
            section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
            para: '2'
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
          text: 'The Treaty of Portsmouth formally ended the Russo-Japanese War of 1904–05. The negotiations took place in August in Portsmouth, New Hampshire, and were brokered in part by U.S. President Theodore Roosevelt. The final agreement was signed in September of 1905, and it affirmed the Japanese presence in south Manchuria and Korea and ceded the southern half of the island of Sakhalin to Japan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        },
        {
          id: 'q2',
          text: 'When negotiations reached an impasse, Roosevelt stepped in with the proposal that Russia “buy back” the northern part of Sakhalin from Japanese control. The Russians were adamant that they would not pay any amount of money, which would act as a disguised indemnity, when the territory ought to be theirs. After long internal debate, Japan eventually agreed to take only the southern half of the island, without any kind of payment. Theirs had not been a decisive enough victory to force the point.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Still, the Japanese public felt they had won the war, and they considered the lack of an indemnity to be an affront. There was a brief outbreak of protests and rioting in Tokyo when the terms of the agreement were made public. Similarly, the Russian people were also dissatisfied, angry about giving up half of Sakhalin.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        },
        {
          id: 'q4',
          text: 'The Treaty of Portsmouth marked the last real event in an era of U.S.-Japanese cooperation that began with the Meiji Restoration in 1868. Instead, competition between the two nations in the Pacific grew over the years that followed. Conversely, Japanese relations with Russia improved in the wake of the treaty.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Portraits_of_envoys_at_the_Portsmouth_Peace_Conference%2C_Baron_Komura_and_Kogoro_Takahira_%28left%29%2C_M._Witte_and_Baron_Rosen_%28right%29%2C_and_President_Theodore_Roosevelt_%28center%29._Written_at_LCCN2005680007.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portraits_of_envoys_at_the_Portsmouth_Peace_Conference,_Baron_Komura_and_Kogoro_Takahira_(left),_M._Witte_and_Baron_Rosen_(right),_and_President_Theodore_Roosevelt_(center)._Written_at_LCCN2005680007.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'sanbo-honbu-1912-nichi-ro-senshi', perspective: 'japanese' },
    { source: 'vik-1910-russko-iaponskaia-voina', perspective: 'russian-soviet' }
  ]
})
