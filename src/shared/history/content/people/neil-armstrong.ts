import { definePerson } from '../../schema'

export default definePerson({
  id: 'neil-armstrong',
  names: [
    { text: 'Neil Armstrong', lang: 'en', role: 'primary' },
    { text: 'Neil A. Armstrong', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1930-08-05' },
        cites: [
          { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '7' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2012-08-25' },
        cites: [
          {
            source: 'nasa-neil-a-armstrong',
            loc: { section: 'Neil A. Armstrong', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['scientist', 'military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1280px-Neil_Armstrong_pose.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Neil_Armstrong_pose.jpg',
    credit: { institution: 'NASA' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Armstrong is probably best known as the commander of NASA’s Apollo 11 mission to the moon, during which he became the first person to set foot on the moon on July 20, 1969.',
          lang: 'en',
          cite: { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '2' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Armstrong was born August 5, 1930, in Wapakoneta, Ohio. He attended Purdue University, earning a Bachelor of Science in aeronautical engineering in 1955.',
          lang: 'en',
          cite: { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '7' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Neil A. Armstrong served as a naval aviator from 1949 to 1952 before joining the National Advisory Committee for Aeronautics (NACA) at the Lewis Flight Propulsion Laboratory (later NASA’s Lewis Research Center in Cleveland, Ohio, and today the Glenn Research Center) in 1955.',
          lang: 'en',
          cite: { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '1' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        },
        {
          id: 'q4',
          text: 'In March 1966, he commanded the Gemini 8 orbital space flight with David Scott as pilot that accomplished the first successful docking of two vehicles in orbit.',
          lang: 'en',
          cite: { source: 'nasa-neil-a-armstrong', loc: { section: 'Neil A. Armstrong', para: '8' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Armstrong left NASA in August 1971 to become professor of engineering at the University of Cincinnati in Ohio, a post he held until 1979.',
          lang: 'en',
          cite: {
            source: 'nasa-neil-a-armstrong',
            loc: { section: 'Neil A. Armstrong', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Armstrong died on Aug. 25, 2012, at the age of 82 due to complications relating to cardiovascular bypass procedures performed several weeks earlier.',
          lang: 'en',
          cite: {
            source: 'nasa-neil-a-armstrong',
            loc: { section: 'Neil A. Armstrong', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nasa.gov/people/neil-a-armstrong' }
        }
      ]
    }
  ]
})
