import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'construction-of-the-panama-canal',
  names: [
    { text: 'Construction of the Panama Canal', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1914-08-15' },
        cites: [
          {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  participants: [
    {
      name: 'George Washington Goethals',
      role: 'leader',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'Building the Canal', para: '2' }
        }
      ]
    },
    {
      name: 'William Crawford Gorgas',
      role: 'leader',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'Building the Canal', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'President Theodore Roosevelt oversaw the realization of a long-term United States goal—a trans-isthmian canal. Throughout the 1800s, American and British leaders and businessmen wanted to ship goods quickly and cheaply between the Atlantic and Pacific coasts.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-panama-canal',
            loc: { section: 'Building the Panama Canal, 1903–1914', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1899-1913/panama-canal'
          }
        },
        {
          id: 'q1',
          text: 'When the United States canal builders arrived in 1904 to begin their momentous task, Panama City and Colón were both small, squalid towns. A single railroad stretched between the towns, running alongside the muddy scars of the abortive French effort. The new builders were haunted by the ghosts of de Lesseps\'s failure and of the workers, some 25,000 of whom had died on the project.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/10.htm' }
        },
        {
          id: 'q2',
          text: 'The most formidable task that the North Americans faced was that of ridding the area of deadly mosquitoes.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/10.htm' }
        },
        {
          id: 'q3',
          text: 'Gorgas\'s work is credited with saving at least 71,000 lives and some 40 million days of sickness. The cleaner, safer conditions enabled the canal diggers to attract a labor force. By 1913 approximately 65,000 men were on the payroll. Most were West Indians, although some 12,000 workers were recruited from southern Europe.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/10.htm' }
        },
        {
          id: 'q4',
          text: 'The most challenging tasks involved in the actual digging of the canal were cutting through the mountain ridge at Culebra; building a huge dam at Gatún to trap the Río Chagres and form an artificial lake; and building three double sets of locks--Gatun Locks, Pedro Miguel Locks, and Miraflores Locks--to raise the ships to the lake, almost twenty-six meters above sea level, and then lower them. On August 15, 1914, the first ship made a complete passage through the canal.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'By the time the canal project was completed, its economic impact had created a new middle class. In addition, new forms of discrimination occurred. Panamanian society had become segregated not only by class but by race and national origin as well. Furthermore, United States commercial competition and political intervention had already begun to generate resentment among Panamanians.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'Building the Canal', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/10.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Panama_Canal_under_construction%2C_1907.jpg/1280px-Panama_Canal_under_construction%2C_1907.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Panama_Canal_under_construction,_1907.jpg',
    title: 'Excavation and removal of dirt at the Culebra Cut, Panama Canal',
    credit: { institution: 'Library of Congress', creator: 'H.C. White Co.' },
    license: { id: 'public-domain' }
  }
})
