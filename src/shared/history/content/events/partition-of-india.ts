import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'partition-of-india',
  names: [
    { text: 'Partition of India', lang: 'en', role: 'primary' },
    { text: 'भारत का विभाजन', lang: 'hi', role: 'native' },
    { text: 'تقسیم ہند', lang: 'ur', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'partition',
  start: {
    alts: [
      {
        value: { d: '1947-08-15' },
        cites: [
          {
            source: 'legislation-gov-uk-indian-independence-act-1947',
            loc: { section: 'Section 1' }
          },
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:karachi',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'INDEPENDENT PAKISTAN', para: '3' }
        }
      ]
    },
    {
      ref: 'place:lahore',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'INDEPENDENT PAKISTAN', para: '3' }
        }
      ]
    },
    {
      ref: 'place:bengal',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Toward Partition', para: '10' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:british-raj' }
  ],
  polities: [
    { ref: 'polity:british-raj' },
    { ref: 'polity:india' },
    { ref: 'polity:pakistan' }
  ],
  participants: [
    {
      ref: 'person:jawaharlal-nehru',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        }
      ]
    },
    {
      ref: 'person:muhammad-ali-jinnah',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mahatma-gandhi',
      role: 'leader',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Toward Partition', para: '8' }
        }
      ]
    },
    {
      ref: 'person:louis-mountbatten',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        },
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Toward Partition', para: '9' }
        }
      ]
    },
    {
      name: 'Clement Attlee',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Toward Partition', para: '10' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 250000 },
            cites: [
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 12000000, max: 24000000 },
            cites: [
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:second-world-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'On June 3, 1947, British prime minister Clement Attlee introduced a bill in the House of Commons calling for the independence and partition of India. On July 14, the House of Commons passed the India Independence Act, by which two independent dominions were created on the subcontinent; the princely states were left to accede to either.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        },
        {
          id: 'q1',
          text: '(1)As from the fifteenth day of August, nineteen hundred and forty-seven, two independent Dominions shall be set up in India, to be known respectively as India and Pakistan.',
          lang: 'en',
          cite: {
            source: 'legislation-gov-uk-indian-independence-act-1947',
            loc: { section: 'Section 1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.legislation.gov.uk/ukpga/Geo6/10-11/30/enacted'
          }
        },
        {
          id: 'q2',
          text: 'At midnight, on August 15, 1947, India strode to freedom amidst ecstatic shouting of "Jai Hind" (roughly, Long Live India), when Nehru delivered a memorable and moving speech on India\'s "tryst with destiny."',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'Jinnah persuaded the participants at the annual Muslim League session in Lahore in 1940 to adopt what later came to be known as the Pakistan Resolution, demanding the division of India into two separate sovereign states, one Muslim, the other Hindu.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        },
        {
          id: 'q4',
          text: 'The Muslim League\'s success could be gauged from its sweep of 90 percent of the Muslim seats in the 1946 election, compared with only 4.5 percent in the 1937 elections. The 1946 election was, in effect, a plebiscite among Muslims on Pakistan.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When the viceroy proceeded to form an interim government without the Muslim League, Jinnah called for demonstrations, or "Direct Action," on August 16, 1946. Communal rioting broke out on an unprecedented scale, especially in Bengal and Bihar.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'The most conservative estimates of the casualties were 250,000 dead and 12 million to 24 million refugees.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/14.htm' }
        },
        {
          id: 'q8',
          text: 'The euphoria of independence was short-lived as partition brought disastrous consequences for India in the wake of communal conflict. Partition unleashed untold misery and loss of lives and property as millions of Hindu and Muslim refugees fled either Pakistan or India.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Independent India', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/22.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'The Hindu maharajah of predominantly Muslim Jammu and Kashmir remained uncommitted until armed tribesmen and regular troops from Pakistan infiltrated his domain, inducing him to sign the Instrument of Accession to India on October 27, 1947. Pakistan refused to accept the legality of the accession, and, as a result, war broke out',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Independent India', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/22.htm' }
        },
        {
          id: 'q10',
          text: 'The assassination of Mahatma Gandhi on January 30, 1948, in New Delhi, by a Hindu extremist opposed to Gandhi\'s openness to Muslims ended the tenuous celebration of independence and deepened the hatred and mutual suspicion in Hindu-Muslim relations.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Independent India', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/22.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1946-08-16' },
            cites: [
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'Toward Partition', para: '8' }
              },
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'When it appeared that the Congress had no desire to share power with the Muslim League at the center, Jinnah declared August 16, 1946, Direct Action Day, which brought communal rioting and massacre in many places in the north. Partition seemed preferable to civil war.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1947-06-03' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              },
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'Toward Partition', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On June 3, 1947, Viscount Louis Mountbatten, the viceroy (1947) and governor-general (1947-48), announced plans for partition of the British Indian Empire into the nations of India and Pakistan, which itself was divided into east and west wings on either side of India',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1947-07-18' },
            cites: [
              {
                source: 'legislation-gov-uk-indian-independence-act-1947',
                loc: { section: 'Indian Independence Act 1947' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'An Act to make provision for the setting up in India of two independent Dominions, to substitute other provisions for certain provisions of the Government of India Act,1935 which apply outside those Dominions, and to provide for other matters consequential on or connected with the setting up of those Dominions.',
        lang: 'en',
        cite: {
          source: 'legislation-gov-uk-indian-independence-act-1947',
          loc: { section: 'Long title' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.legislation.gov.uk/ukpga/Geo6/10-11/30/enacted'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1947-08-17' },
            cites: [
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The actual boundaries of the two new states were not even known until August 17, when they were announced by a commission headed by a British judge. The boundaries-- unacceptable to both India and Pakistan--have remained.',
        lang: 'en',
        cite: {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/14.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Map_of_the_partition_boundaries_in_the_Punjab%2C_Research_Dept.%2C_F.O.%2C_September%2C_1948.jpg/1280px-Map_of_the_partition_boundaries_in_the_Punjab%2C_Research_Dept.%2C_F.O.%2C_September%2C_1948.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_partition_boundaries_in_the_Punjab,_Research_Dept.,_F.O.,_September,_1948.jpg',
    credit: {
      institution: 'India: The Transfer of Power, 1942-47, vol. 12 (1983)',
      creator: 'Research Department, Foreign Office'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'menon-1957-the-transfer-of-power-in-india', perspective: 'south-asian' },
    { source: 'ali-1967-the-emergence-of-pakistan', perspective: 'south-asian' },
    { source: 'jalal-1985-the-sole-spokesman', perspective: 'south-asian' },
    { source: 'butalia-1998-the-other-side-of-silence', perspective: 'south-asian' }
  ]
})
