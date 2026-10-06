import { definePerson } from '../../schema'

export default definePerson({
  id: 'thomas-edison',
  names: [
    { text: 'Thomas Edison', lang: 'en', role: 'primary' },
    {
      text: 'Thomas Alva Edison',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nps-edis-edison-biography',
          loc: { section: 'Edison Biography', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1847-02-11' },
        cites: [
          {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1931-10-18' },
        cites: [
          {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '23' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['scientist', 'businessperson'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Thomas Alva Edison was born on February 11, 1847 in Milan, Ohio; the seventh and last child of Samuel and Nancy Edison.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The first great invention developed by Edison in Menlo Park was the tin foil phonograph.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        },
        {
          id: 'q3',
          text: 'Out of his New Jersey laboratories, which were themselves inventions – thoroughly equipped and fully staffed – came 1,093 patented inventions and innovations that made Edison one of the most prolific inventors of all time.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-edison-light-bulb-patent',
            loc: {
              section: 'Thomas Edison\'s Patent Application for the Light Bulb (1880)',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/thomas-edisons-patent-application-for-the-light-bulb'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Edison\'s role in life began to change from inventor and industrialist to cultural icon, a symbol of American ingenuity, and a real life Horatio Alger story.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Edison_and_phonograph.jpg/1280px-Edison_and_phonograph.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Edison_and_phonograph.jpg',
    credit: { institution: 'Library of Congress', creator: 'Levin C. Handy' },
    license: { id: 'public-domain' }
  }
})
