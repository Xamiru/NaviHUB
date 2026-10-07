import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-martin-luther-king-jr',
  names: [
    { text: 'Assassination of Martin Luther King Jr.', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1968-04-04' },
        cites: [
          {
            source: 'nps-malu-april-4th-a-day-of-remembrance',
            loc: { section: 'April 4th A Day of Remembrance', para: '4' }
          },
          {
            source: 'nps-tennessee-the-lorraine-motel',
            loc: { section: 'Tennessee: The Lorraine Motel', para: '12' }
          },
          {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '32' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:memphis',
      cites: [
        {
          source: 'nps-malu-april-4th-a-day-of-remembrance',
          loc: { section: 'April 4th A Day of Remembrance', para: '4' }
        },
        {
          source: 'hsca-1979-report',
          loc: { section: 'Summary of Findings and Recommendations', para: '32' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:martin-luther-king-jr',
      role: 'victim',
      cites: [
        {
          source: 'nps-malu-april-4th-a-day-of-remembrance',
          loc: { section: 'April 4th A Day of Remembrance', para: '4' }
        }
      ]
    },
    {
      name: 'James Earl Ray',
      role: 'perpetrator',
      cites: [
        {
          source: 'hsca-1979-report',
          loc: { section: 'Summary of Findings and Recommendations', para: '33' }
        },
        {
          source: 'doj-2000-king-assassination-allegations',
          loc: { section: 'Overview', para: '5' }
        }
      ]
    },
    {
      name: 'Ralph Abernathy',
      role: 'participant',
      cites: [
        {
          source: 'nps-tennessee-the-lorraine-motel',
          loc: { section: 'Tennessee: The Lorraine Motel', para: '13' }
        }
      ]
    },
    {
      name: 'Andrew Young',
      role: 'participant',
      cites: [
        {
          source: 'nps-tennessee-the-lorraine-motel',
          loc: { section: 'Tennessee: The Lorraine Motel', para: '13' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Lorraine_Motel%2C_Memphis%2C_Tennessee_LCCN2010630679.tif/lossy-page1-1280px-Lorraine_Motel%2C_Memphis%2C_Tennessee_LCCN2010630679.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lorraine_Motel,_Memphis,_Tennessee_LCCN2010630679.tif',
    credit: { institution: 'Library of Congress', creator: 'Carol M. Highsmith' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On April 4, 1968 Dr. Martin Luther King, Jr. was assassinated while standing on the balcony of the Lorraine Motel in Memphis, Tennessee.',
          lang: 'en',
          cite: {
            source: 'nps-malu-april-4th-a-day-of-remembrance',
            loc: { section: 'April 4th A Day of Remembrance', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/malu/april-4th-a-day-of-remembrance.htm'
          }
        },
        {
          id: 'q2',
          text: 'Dr. King was in Memphis supporting black sanitation workers who were on strike and demanding safer working conditions and better pay.',
          lang: 'en',
          cite: {
            source: 'nps-malu-april-4th-a-day-of-remembrance',
            loc: { section: 'April 4th A Day of Remembrance', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/malu/april-4th-a-day-of-remembrance.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Partly because of its historical importance to the black community of Memphis, Martin Luther King chose to stay at the Lorraine during the 1968 Memphis sanitation workers strike.',
          lang: 'en',
          cite: {
            source: 'nps-tennessee-the-lorraine-motel',
            loc: { section: 'Tennessee: The Lorraine Motel', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/places/tennessee-the-lorraine-hotel-memphis.htm'
          }
        },
        {
          id: 'q4',
          text: 'King, Ralph Abernathy, Andrew Young and other black leaders came to support 1,300 striking sanitation workers.',
          lang: 'en',
          cite: {
            source: 'nps-tennessee-the-lorraine-motel',
            loc: { section: 'Tennessee: The Lorraine Motel', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/places/tennessee-the-lorraine-hotel-memphis.htm'
          }
        },
        {
          id: 'q5',
          text: 'Following a bloody confrontation between marching strikers and police, a court injunction had been issued banning further protests. King hoped their planned march would overturn the court injunction, but such plans were cut short on April 4, 1968 when an assassin shot and killed King on the balcony of King\'s room.',
          lang: 'en',
          cite: {
            source: 'nps-tennessee-the-lorraine-motel',
            loc: { section: 'Tennessee: The Lorraine Motel', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/places/tennessee-the-lorraine-hotel-memphis.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Dr. King’s funeral was held at Ebenezer Baptist Church on April 9th, 1968, followed by a procession of some 200,000 silent mourners walking to the Morehouse Campus for another funeral service as well.',
          lang: 'en',
          cite: {
            source: 'nps-malu-april-4th-a-day-of-remembrance',
            loc: { section: 'April 4th A Day of Remembrance', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/malu/april-4th-a-day-of-remembrance.htm'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q7',
          text: 'In 1991, the Lorraine Motel was converted into the National Civil Rights Museum.',
          lang: 'en',
          cite: {
            source: 'nps-tennessee-the-lorraine-motel',
            loc: { section: 'Tennessee: The Lorraine Motel', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/places/tennessee-the-lorraine-hotel-memphis.htm'
          }
        }
      ]
    }
  ]
})
