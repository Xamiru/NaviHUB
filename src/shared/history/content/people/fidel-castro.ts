import { definePerson } from '../../schema'

export default definePerson({
  id: 'fidel-castro',
  names: [
    { text: 'Fidel Castro', lang: 'en', role: 'primary' },
    { text: 'Fidel Castro Ruz', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-07',
  regions: ['latin-america'],
  roles: ['revolutionary', 'head-of-state'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Fidel_Castro_-_MATS_Terminal_Washington_1959_%28cropped%29.png/1280px-Fidel_Castro_-_MATS_Terminal_Washington_1959_%28cropped%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Fidel_Castro_-_MATS_Terminal_Washington_1959_(cropped).png',
    credit: { institution: 'Library of Congress', creator: 'Warren K. Leffler' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'There he organized the "26th of July Movement" with the goal of overthrowing Batista',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Castro declared Cuba a socialist state on April 16, 1961.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        },
        {
          id: 'q3',
          text: 'Raul Castro replaced his brother Fidel Castro as chief of state, president of Cuba, and commander-in-chief of the armed forces on February 24, 2008.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        }
      ]
    }
  ]
})
