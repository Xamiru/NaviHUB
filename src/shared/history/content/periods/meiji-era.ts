import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'meiji-era',
  names: [
    { text: 'Meiji era', lang: 'en', role: 'primary' },
    { text: '明治', lang: 'ja', role: 'native' },
    {
      text: 'Enlightened Rule',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  periodType: 'era',
  start: {
    alts: [
      {
        value: { d: '1868' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '2' }
          },
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1912' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Meiji oligarchy, as the new ruling class is known to historians, was a privileged clique that exercised imperial power, sometimes despotically.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q2',
          text: 'Undeterred by opposition, the Meiji leaders continued to modernize the nation through government-sponsored telegraph cable links to all major Japanese cities and the Asian mainland and construction of railroads, shipyards, munitions factories, mines, textile manufacturing facilities, factories, and experimental agriculture stations.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg/1280px-Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mutsuhito,_The_Meiji_Emperor_MET_DT8575.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Uchida Kuichi' },
    license: { id: 'cc0' }
  }
})
