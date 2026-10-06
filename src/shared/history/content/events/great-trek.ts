import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-trek',
  names: [
    {
      text: 'Great Trek',
      lang: 'en',
      role: 'primary',
      usedBy: [
        { kind: 'school', name: 'Nationalist historians' }
      ],
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '2' }
        }
      ]
    },
    { text: 'Groot Trek', lang: 'af', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'migration',
  start: {
    alts: [
      {
        value: { d: '1836' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  participants: [
    {
      name: 'Piet Retief',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '4' }
        }
      ]
    },
    {
      name: 'Andries Pretorius',
      role: 'commander',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    },
    {
      name: 'Mzilikazi',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '3' }
        }
      ]
    },
    {
      name: 'Dingane',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 6000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Great Trek', para: '2' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-blood-river',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Dutch speakers denounced these actions as striking at the heart of their labor and land needs.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q2',
          text: 'Those living in the eastern Cape, most of them among the poorer segment of the Dutch-speaking population, were particularly impassioned in their criticisms, and many decided to abandon their farms and to seek new lands beyond the reach of British rule.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q3',
          text: 'Moreover, slaveowners were to receive no more than one-third of the value of their slaves in official compensation for the loss of this property.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Colonialism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/11.htm' }
        },
        {
          id: 'q4',
          text: 'The Boers felt further threatened when, in 1834 and 1835, British forces, attempting to put a final stop to Boer-Xhosa frontier conflict, swept across the Keiskama River into Xhosa territory and annexed all the land up to the Keiskama River for white settlement.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Colonialism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'Beginning in 1836, Boer families, together with large numbers of Khoikhoi and black servants, gathered up their belongings and traveled by ox-wagon up into the Highveld interior to the north of the eastern Cape frontier.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q6',
          text: 'All told, some 6,000 Boer men, women, and children, along with an equal number of blacks, participated in this movement in the late 1830s.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q7',
          text: 'The exodus from the Cape was not organized in a single movement at the time, but it was later termed the Great Trek by nationalist historians, and its participants were called Voortrekkers (pioneers).',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q8',
          text: 'This time the northern Voortrekkers succeeded in defeating Mzilikazi and forcing him and most of his followers to flee north into present-day Zimbabwe, where he conquered the Shona and established a new state.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The British, however, feeling that their security and authority were threatened, annexed the republic as Natal.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        },
        {
          id: 'q10',
          text: 'Although acquiescing in the annexation, the great majority of the Voortrekkers effectively abandoned Natal to the British and moved back to the Highveld in 1843.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Great Trek', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1836' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Great Trek', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1836 the Voortrekkers fought off an Ndebele attempt to expel them from the Highveld.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-02' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Great Trek', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Dingane was at first receptive to Retief\'s entreaties, but then, apparently fearing that the introduction of European settlers would undermine his authority, he had Retief and seventy of his followers killed while they were at his capital in February 1838.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1839' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Great Trek', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Voortrekker Republic of Natalia (the basis of later Natal Province) was established in 1839, and by 1842 there were approximately 6,000 people occupying vast areas of pastureland and living under a political system in which only white males had the right to vote.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Great Trek', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/12.htm' }
      }
    }
  ]
})
