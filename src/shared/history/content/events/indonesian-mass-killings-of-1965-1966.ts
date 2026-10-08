import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indonesian-mass-killings-of-1965-1966',
  names: [
    { text: 'Indonesian mass killings of 1965–1966', lang: 'en', role: 'primary' },
    { text: 'Pembantaian di Indonesia 1965–1966', lang: 'id', role: 'native' },
    {
      text: 'September 30 Movement (Gestapu)',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1965-10' },
        cites: [
          {
            source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
            loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1966-03' },
        cites: [
          {
            source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
            loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:jakarta',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '2' } }
      ]
    },
    {
      ref: 'place:bali',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '5' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:sukarno',
      role: 'head-of-state',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '7' } }
      ]
    },
    {
      name: 'Suharto',
      role: 'commander',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '1' } },
        {
          source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
          loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
        }
      ]
    },
    {
      name: 'Indonesian Communist Party (PKI)',
      role: 'victim',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '5' } }
      ]
    },
    {
      name: 'Indonesian Army',
      role: 'perpetrator',
      cites: [
        {
          source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
          loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
        }
      ]
    },
    {
      name: 'Ansor',
      role: 'perpetrator',
      cites: [
        { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '5' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 78000, max: 2000000 },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The Coup', para: '5' }
              }
            ]
          },
          {
            value: { min: 300000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The Coup', para: '5' }
              }
            ]
          },
          {
            value: { min: 500000, qualifier: 'up-to' },
            cites: [
              {
                source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
                loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 1000000, qualifier: 'up-to' },
            cites: [
              {
                source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
                loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the wake of the September 30 coup\'s failure, there was a violent anticommunist reaction. By December 1965, mobs were engaged in large-scale killings, most notably in Jawa Timur Province and on Bali, but also in parts of Sumatra.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        },
        {
          id: 'q2',
          text: 'Whichever figure is true, the elimination of the PKI was the bloodiest event in postwar Southeast Asia until the Khmer Rouge established its regime in Cambodia a decade later.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By 1965 Indonesia had become a dangerous cockpit of social and political antagonisms. The PKI\'s rapid growth aroused the hostility of Islamic groups and the military.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        },
        {
          id: 'q4',
          text: 'The PKI membership rolls totaled 2 million, making it the world\'s largest communist party in a noncommunist country.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Sukarno and the PKI', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/19.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'The coup perpetrators murdered five generals on the night of September 30 and fatally wounded Nasution\'s daughter in an unsuccessful attempt to assassinate him.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        },
        {
          id: 'q6',
          text: 'The extent and nature of PKI involvement in the coup are unclear, however.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Members of Ansor, the Nahdatul Ulama\'s youth branch, were particularly zealous in carrying out a "holy war" against the PKI on the village level. Chinese were also targets of mob violence.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        },
        {
          id: 'q8',
          text: 'After crushing the Movement, which had kidnapped and killed six high-ranking Army generals, the Indonesian Army and its paramilitary allies launched a campaign of annihilation against the PKI and its affiliated organizations, killing up to 500,000 alleged PKI supporters between October 1965 and March 1966',
          lang: 'en',
          cite: {
            source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
            loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://nsarchive.gwu.edu/briefing-book/indonesia/2017-10-17/indonesia-mass-murder-1965-us-embassy-files'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'By signing the executive order of March 11, 1966, Supersemar, he was obliged to transfer supreme authority to Suharto. On March 12, 1967, the MPRS stripped Sukarno of all political power and installed Suharto as acting president.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Coup', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
        },
        {
          id: 'q10',
          text: 'The U.S. government had detailed knowledge that the Indonesian Army was conducting a campaign of mass murder against the country’s Communist Party (PKI) starting in 1965',
          lang: 'en',
          cite: {
            source: 'nsarchive-2017-us-embassy-tracked-indonesia-mass-murder-1965',
            loc: { section: 'U.S. Embassy Tracked Indonesia Mass Murder 1965' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://nsarchive.gwu.edu/briefing-book/indonesia/2017-10-17/indonesia-mass-murder-1965-us-embassy-files'
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
            value: { d: '1965-10-01' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The Coup', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Capturing the Indonesian state radio station on October 1, 1965, they announced that they had formed the Revolutionary Council and a cabinet',
        lang: 'en',
        cite: { source: 'loc-indonesia-country-study-1993', loc: { section: 'The Coup', para: '2' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Suharto_as_the_commander_of_Kostrad.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Suharto_as_the_commander_of_Kostrad.jpg',
    credit: { institution: 'Presidential Library, National Library of Indonesia' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'sulistyo-2011-palu-arit-di-ladang-tebu', perspective: 'southeast-asian' }
  ]
})
