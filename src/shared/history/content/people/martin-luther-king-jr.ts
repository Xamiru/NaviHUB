import { definePerson } from '../../schema'

export default definePerson({
  id: 'martin-luther-king-jr',
  names: [
    { text: 'Martin Luther King Jr.', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1929-01-15' },
        cites: [
          {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '9' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1968-04-04' },
        cites: [
          {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '13' }
          },
          {
            source: 'nps-malu-april-4th-a-day-of-remembrance',
            loc: { section: 'April 4th A Day of Remembrance', para: '4' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:atlanta',
    cites: [
      {
        source: 'nps-dr-martin-luther-king-jr',
        loc: { section: 'Dr. Martin Luther King, Jr.', para: '7' }
      }
    ]
  },
  diedIn: {
    ref: 'place:memphis',
    cites: [
      {
        source: 'nps-dr-martin-luther-king-jr',
        loc: { section: 'Dr. Martin Luther King, Jr.', para: '11' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['activist', 'cleric'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Martin_Luther_King_Jr_NYWTS.jpg/1280px-Martin_Luther_King_Jr_NYWTS.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Martin_Luther_King_Jr_NYWTS.jpg',
    credit: {
      institution: 'Library of Congress Prints and Photographs Division (New York World-Telegram & Sun collection)',
      creator: 'Dick DeMarsico'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Dr. Martin Luther King, Jr. (1929-1968) was the nation\'s most prominent leader in the 20th century struggle for civil rights.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Martin Luther King, Jr. (1929-1968) was the nation\'s most prominent leader in the 20th century struggle for civil rights. He was born in the segregated south of Atlanta, Georgia and after graduating from Morehouse College, Crozer Theological Seminary, and Boston University he entered the Christian ministry.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Following Rosa Parks\' arrest in 1955 for refusing to move to the back of a bus in Montgomery, he organized a year-long bus boycott. The "Montgomery Movement" led to the integration of the city\'s buses and launched a non-violent protest movement that spread across the United States.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        },
        {
          id: 'q4',
          text: 'In 1963, he was one of the organizers for the March on Washington and the following year he received the Nobel Peace Prize.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        },
        {
          id: 'q5',
          text: 'He worked tirelessly to assure the passage of the Civil Rights Act of 1964 and was in attendance when President Johnson signed both that Act and the Voting Rights Act of 1965 into law.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'In 1968, Martin Luther King was assassinated while in Memphis, Tennessee, to help striking sanitation workers.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'His legacy lives on and his writings and speeches, including "I Have a Dream", from the March on Washington and "I\'ve Been to the Mountaintop," given just hours before his death, continue to inspire new generations.',
          lang: 'en',
          cite: {
            source: 'nps-dr-martin-luther-king-jr',
            loc: { section: 'Dr. Martin Luther King, Jr.', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://home.nps.gov/people/martinlutherkingjr.htm'
          }
        }
      ]
    }
  ]
})
