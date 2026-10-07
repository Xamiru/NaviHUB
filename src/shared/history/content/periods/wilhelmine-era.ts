import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'wilhelmine-era',
  names: [
    { text: 'Wilhelmine Era', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  periodType: 'era',
  start: {
    alts: [
      {
        value: { d: '1890' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1914' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Foreign policy in the Wilhelmine Era (1890-1914) turned away from Bismarck\'s cautious diplomacy of the 1871-90 period. It was also marked by a shrill aggressiveness. Brusque, clumsy diplomacy was backed by increased armaments production, most notably the creation of a large fleet of battleships capable of challenging the British navy. This new bellicosity alarmed the rest of Europe, and by about 1907 German policy makers had succeeded in creating Bismarck\'s nightmare: a Germany "encircled" by an alliance of hostile neighbors--in this case Russia, France, and Britain--in an alliance called the Triple Entente.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/33.htm' }
        },
        {
          id: 'q2',
          text: 'The German naval expansion program had many domestic supporters. The kaiser deeply admired the navy of his grandmother, Queen Victoria of Britain, and wanted one as large for himself. Powerful lobbying groups in Germany desired a large navy to give Germany a worldwide role and to protect a growing German colonial empire in Africa and the Pacific.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/33.htm' }
        },
        {
          id: 'q3',
          text: 'Two crises over Morocco, in 1905 and 1911, drove France and Britain closer together and made for a tense international atmosphere.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/33.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Bain_News_Service_-_The_Library_of_Congress_-_Kaiser_Wilhelm_%28LOC%29_%28pd%29.jpg/1280px-Bain_News_Service_-_The_Library_of_Congress_-_Kaiser_Wilhelm_%28LOC%29_%28pd%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bain_News_Service_-_The_Library_of_Congress_-_Kaiser_Wilhelm_(LOC)_(pd).jpg',
    credit: { institution: 'Library of Congress', creator: 'E. Bieber' },
    license: { id: 'public-domain' }
  }
})
