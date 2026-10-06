import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'sokoto-caliphate',
  names: [
    { text: 'Sokoto Caliphate', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1809' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The new state that arose during Usman dan Fodio\'s jihad came to be known as the Sokoto Caliphate, named after his capital at Sokoto, founded in 1809. The caliphate was a loose confederation of emirates that recognized the suzerainty of the commander of the faithful, the sultan.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        },
        {
          id: 'q2',
          text: 'Usman dan Fodio\'s jihad created the largest empire in Africa since the fall of Songhai in 1591.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/The_States_of_the_Nigerian_Region_in_the_19th_Century.png/1280px-The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    page: 'https://commons.wikimedia.org/wiki/File:The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    credit: { institution: 'United States government' },
    license: { id: 'public-domain' }
  }
})
