import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'apollo-11',
  names: [
    { text: 'Apollo 11', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1969-07-16' },
        cites: [
          {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1969-07-24' },
        cites: [
          {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 2,
  participants: [
    {
      ref: 'person:neil-armstrong',
      role: 'commander',
      cites: [
        {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '4' }
        },
        { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '2' } }
      ]
    },
    {
      name: 'Michael Collins',
      role: 'participant',
      cites: [
        {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '4' }
        }
      ]
    },
    {
      name: 'Edwin “Buzz” Aldrin',
      role: 'participant',
      cites: [
        {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '4' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/1280px-Aldrin_Apollo_11_original.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11_original.jpg',
    credit: { institution: 'NASA', creator: 'Neil Armstrong' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In July 1969, Apollo 11 astronauts Neil A. Armstrong, Michael Collins, and Edwin E. “Buzz” Aldrin completed humanity’s first landing on the Moon. They fulfilled President John F. Kennedy’s national goal, set in May 1961, to land a man on the Moon and return him safely to the Earth before the end of the decade.',
          lang: 'en',
          cite: {
            source: 'nasa-uri-2024-apollo-11-one-small-step',
            loc: { section: '55 Years Ago: Apollo 11’s One Small Step, One Giant Leap', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/history/55-years-ago-apollo-11s-one-small-step-one-giant-leap/'
          }
        },
        {
          id: 'q2',
          text: 'The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth.',
          lang: 'en',
          cite: {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Partially piloted manually by Armstrong, the Eagle landed in the Sea of Tranquility in Site 2 at 0 degrees, 41 minutes, 15 seconds north latitude and 23 degrees, 26 minutes east longitude.',
          lang: 'en',
          cite: {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
          }
        },
        {
          id: 'q4',
          text: 'During the EVA, in which they both ranged up to 300 feet from the Eagle, Aldrin deployed the Early Apollo Scientific Experiments Package, or EASEP, experiments, and Armstrong and Aldrin gathered and verbally reported on the lunar surface samples.',
          lang: 'en',
          cite: {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
          }
        },
        {
          id: 'q5',
          text: 'Armstrong and Aldrin spent 21 hours, 36 minutes on the moon’s surface.',
          lang: 'en',
          cite: {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Scientists began examining the first Moon rocks two days after the Apollo 11 splashdown while the astronauts began a three-week postflight quarantine.',
          lang: 'en',
          cite: {
            source: 'nasa-uri-2024-apollo-11-one-small-step',
            loc: { section: '55 Years Ago: Apollo 11’s One Small Step, One Giant Leap', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/history/55-years-ago-apollo-11s-one-small-step-one-giant-leap/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'An estimated 650 million people watched Armstrong’s televised image and heard his voice describe the event as he took “…one small step for a man, one giant leap for mankind” on July 20, 1969.',
          lang: 'en',
          cite: {
            source: 'nasa-loff-2015-apollo-11-mission-overview',
            loc: { section: 'Apollo 11 Mission Overview', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
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
            value: { d: '1969-07-16' },
            cites: [
              {
                source: 'nasa-loff-2015-apollo-11-mission-overview',
                loc: { section: 'Apollo 11 Mission Overview', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Apollo 11 launched from Cape Kennedy on July 16, 1969, carrying Commander Neil Armstrong, Command Module Pilot Michael Collins and Lunar Module Pilot Edwin “Buzz” Aldrin into an initial Earth-orbit of 114 by 116 miles.',
        lang: 'en',
        cite: {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1969-07-20' },
            cites: [
              {
                source: 'nasa-loff-2015-apollo-11-mission-overview',
                loc: { section: 'Apollo 11 Mission Overview', para: '4' }
              },
              {
                source: 'nasa-neil-a-armstrong',
                loc: { section: 'Neil A. Armstrong', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'At about 109 hours, 42 minutes after launch, Armstrong stepped onto the moon. About 20 minutes later, Aldrin followed him.',
        lang: 'en',
        cite: {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1969-07-24' },
            cites: [
              {
                source: 'nasa-loff-2015-apollo-11-mission-overview',
                loc: { section: 'Apollo 11 Mission Overview', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After a flight of 195 hours, 18 minutes, 35 seconds – about 36 minutes longer than planned – Apollo 11 splashed down in the Pacific Ocean, 13 miles from the recovery ship USS Hornet.',
        lang: 'en',
        cite: {
          source: 'nasa-loff-2015-apollo-11-mission-overview',
          loc: { section: 'Apollo 11 Mission Overview', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/'
        }
      }
    }
  ],
  archive: [
    {
      id: 'apollo-11-facts-project-launch',
      mediaKind: 'video',
      title: 'Apollo 11 Facts Project: Pre-Launch Activities and Launch',
      date: { d: '1969' },
      url: 'https://archive.org/download/VJSC_1425B/VJSC_1425B.mp4',
      page: 'https://archive.org/details/VJSC_1425B',
      credit: { institution: 'NASA Johnson Space Center (Internet Archive)', creator: 'NASA/JSC' },
      license: { id: 'public-domain' },
      bytes: 505583444,
      durationSec: 5565
    }
  ]
})
