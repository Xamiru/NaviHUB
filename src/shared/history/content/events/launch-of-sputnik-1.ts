import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'launch-of-sputnik-1',
  names: [
    { text: 'Launch of Sputnik 1', lang: 'en', role: 'primary' },
    { text: 'Спутник-1', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1957-10-04' },
        cites: [
          {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '1' }
          },
          {
            source: 'eisenhower-library-sputnik-and-the-space-race',
            loc: { section: 'Sputnik and the Space Race', para: '1' }
          },
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:kazakhstan',
      cites: [
        {
          source: 'eisenhower-library-sputnik-and-the-space-race',
          loc: { section: 'Sputnik and the Space Race', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:soviet-union' },
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-sputnik',
          loc: { section: 'Sputnik, 1957', para: '5' }
        }
      ]
    },
    {
      ref: 'person:nikita-khrushchev',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-sputnik',
          loc: { section: 'Sputnik, 1957', para: '6' }
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
          text: 'On October 4, 1957, the Soviet Union launched the earth’s first artificial satellite, Sputnik-1. The successful launch came as a shock to experts and citizens in the United States, who had hoped that the United States would accomplish this scientific advancement first.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
          }
        },
        {
          id: 'q2',
          text: 'The satellite named Sputnik, Russian for "traveling companion," transmitted the beeping sounds as it followed its orbit around the globe.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-sputnik-and-the-space-race',
            loc: { section: 'Sputnik and the Space Race', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/sputnik-and-space-race'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'During the 1950s, both the United States and the Soviet Union were working to develop new technology. Nazi Germany had been close to developing the world’s first intercontinental ballistic missile (ICBM) near the end of the Second World War, and German scientists aided research in both countries in the wake of that conflict. Both countries were also engaged in developing satellites as a part of a goal set by the International Council of Scientific Unions, which had called for the launch of satellite technology during late 1957 or 1958. Over the course of the decade, the United States tested several varieties of rockets and missiles, but all of these tests ended in failure.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'At 184 pounds, the Russian satellite was much heavier than anything the United States was developing at the time, and its successful launch was quickly followed by the launch of two additional satellites, including one that carried a dog into space.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The fact that the Soviets were successful fed fears that the U.S. military had generally fallen behind in developing new technology. As a result, the launch of Sputnik served to intensify the arms race and raise Cold War tensions.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
          }
        },
        {
          id: 'q6',
          text: 'Although President Dwight Eisenhower had tried to downplay the importance of the Sputnik launch to the American people, he poured additional funds and resources into the space program in an effort to catch up.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
          }
        },
        {
          id: 'q7',
          text: 'In this way, the launch of Sputnik fueled both the space race and the arms race, in addition to increasing Cold War tensions, as each country worked to prepare new methods of attacking the other.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-sputnik',
            loc: { section: 'Sputnik, 1957', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/sputnik'
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
            value: { d: '1958-01-31' },
            cites: [
              {
                source: 'state-dept-milestones-sputnik',
                loc: { section: 'Sputnik, 1957', para: '5' }
              },
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'January 31, 1958: Launching of Explorer I; first American satellite.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1958-07-29' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'July 29, 1958: President signed bill establishing National Aeronautics and Space Administration.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Sputnik_191378-full.jpg/1280px-Sputnik_191378-full.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sputnik_191378-full.jpg',
    credit: { institution: 'NASA' },
    license: { id: 'public-domain' }
  }
})
