import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-purge',
  names: [
    { text: 'Great Purge', lang: 'en', role: 'primary' },
    {
      text: 'Great Terror',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '10' }
        }
      ]
    },
    {
      text: 'Yezhovshchina',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    },
    { text: 'Большой террор', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1934-12-01' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '207' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1938' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:soviet-union' }
  ],
  participants: [
    {
      ref: 'person:joseph-stalin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '8' }
        },
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    },
    {
      name: 'Nikolay Yezhov',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    },
    {
      name: 'Sergey Kirov',
      role: 'victim',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    },
    {
      name: 'Grigori Zinov\'yev',
      role: 'victim',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        },
        { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '129' } }
      ]
    },
    {
      name: 'Lev Kamenev',
      role: 'victim',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        },
        { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '129' } }
      ]
    },
    {
      name: 'Nikolai Bukharin',
      role: 'victim',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '9' }
        }
      ]
    },
    {
      ref: 'person:ehsanollah-khan-dustdar',
      role: 'victim',
      cites: [
        {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The complete subjugation of the party to Stalin, its leader, paralleled the subordination of industry and agriculture to the state. Stalin had assured his preeminent position by squelching Bukharin and the "right-wing deviationists" in 1929 and 1930. To secure his absolute control over the party, however, Stalin began to purge leaders and rank-and-file members whose loyalty he doubted.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Stalin\'s purges began in December 1934, when Sergey Kirov, a popular Leningrad party chief who advocated a moderate policy toward the peasants, was assassinated.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q3',
          text: 'At three publicized show trials held in Moscow between 1936 and 1938, dozens of these Old Bolsheviks, including Zinov\'yev, Kamenev, and Bukharin, confessed to improbable crimes against the Soviet state. Their confessions were quickly followed by execution.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q4',
          text: 'The Yezhovshchina ("era of Yezhov," named for NKVD chief Nikolay Yezhov) ravaged the military as well, leading to the execution or incarceration of about half the officer corps.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Although details remain murky, many Western historians believe that Stalin instigated the murder to rid himself of a potential opponent.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q6',
          text: 'The reasons for the period of widespread purges, which became known as the Great Terror, remain unclear. Western historians variously hypothesize that Stalin created the terror out of a desire to goad the population to carry out his intensive modernization program, or to atomize society to preclude dissent, or simply out of brutal paranoia.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'By the time the purges subsided in 1938, millions of Soviet leaders, officials, and other citizens had been executed, imprisoned, or exiled.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q8',
          text: 'According to his youngest son, Kāva, Eḥsān-Allāh and his eldest son, Bahman, were arrested in 1937 and killed during the Soviet purges; the exact dates of their deaths have not been made public.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Whatever the causes, the purges must be viewed as having weakened the Soviet state.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1934-12-01' },
            cites: [
              {
                source: 'loc-revelations-russian-archives-internal-workings',
                loc: { section: 'Internal Workings of the Soviet Union' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The murder of Sergei Kirov on December 1, 1934, set off a chain of events that culminated in the Great Terror of the 1930s.',
        lang: 'en',
        cite: {
          source: 'loc-revelations-russian-archives-internal-workings',
          loc: { section: 'Internal Workings of the Soviet Union' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.loc.gov/exhibits/archives/intn.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936-08-19' },
            cites: [
              { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '129' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Vor einem Moskauer Militärtribunal beginnt der Schauprozess gegen die ehemaligen Bolschewikenführer Grigori Sinowjew (1883-1936) und Leo Kamenew (1883-1936). Beide werden nach fünf Tagen zum Tode verurteilt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '130' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1936.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937-01-30' },
            cites: [
              { source: 'lemo-chronik-1937', loc: { section: 'Chronik 1937', para: '18' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In einem weiteren Moskauer Schauprozess werden zahlreiche innenpolitische Gegner Josef W. Stalins zum Tode verurteilt; Karl Radek erhält eine langjährige Kerkerstrafe.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1937', loc: { section: 'Chronik 1937', para: '19' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1937.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937-06-11' },
            cites: [
              { source: 'lemo-chronik-1937', loc: { section: 'Chronik 1937', para: '88' } },
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The War Years', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'More important, eight of the nation\'s top military leaders, including Marshal Mikhail Tukhachevskiy, had been executed in 1937 in the course of Stalin\'s purges; thus the armed forces\' morale and effectiveness were diminished.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The War Years', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/RykovBucharin.JPG/1280px-RykovBucharin.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:RykovBucharin.JPG',
    credit: { creator: 'TASS' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'medvedev-1974-k-sudu-istorii', perspective: 'russian-soviet' }
  ]
})
