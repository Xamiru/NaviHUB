import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'end-of-reconstruction',
  names: [
    { text: 'End of Reconstruction', lang: 'en', role: 'primary' },
    {
      text: 'redemption',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'public', name: 'White supremacists' }
      ],
      cites: [
        {
          source: 'house-history-demise-of-reconstruction',
          loc: { section: 'The Demise of Reconstruction', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1877-04-24' },
        cites: [
          { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '24' } }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Rutherford B. Hayes',
      role: 'head-of-state',
      cites: [
        {
          source: 'house-history-demise-of-reconstruction',
          loc: { section: 'The Demise of Reconstruction', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The 1874 elections signaled a turning point in the history of Reconstruction.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        },
        {
          id: 'q2',
          text: 'Across the South in the summer and fall of 1874, Black and Republican voters faced unending physical violence and intimidation from Democrats intent on reasserting their control of the region’s state and local governments, no matter the means.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        },
        {
          id: 'q3',
          text: 'The 1876 elections also featured a presidential contest, but when an inconclusive count in the Electoral College produced no candidate with a majority, Congress created a special commission to resolve the crisis.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'During the 1870s, the Democratic Party recaptured local and state governments across the South, largely through the use of violence and other means to stop African Americans from voting and undermine the Republican Party.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        },
        {
          id: 'q4',
          text: 'The commission’s slim Republican majority allocated the disputed electoral votes to Republican Rutherford B. Hayes. During his one term in office, however, Hayes turned the attention of the federal government away from the South, effectively ending Reconstruction by reducing the number of federal troops in the region and doing little to protect the civil and political rights of African Americans.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'These Supreme Court decisions severely curtailed the federal government’s efforts to guarantee the rights of the millions of formerly enslaved men and women.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        },
        {
          id: 'q8',
          text: 'By 1879, as conditions worsened in the South, many African Americans sought a way out of the region.',
          lang: 'en',
          cite: {
            source: 'house-history-demise-of-reconstruction',
            loc: { section: 'The Demise of Reconstruction', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/BAIC/Historical-Essays/Fifteenth-Amendment/Demise/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Electoral_Commission_%28United_States%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Electoral_Commission_(United_States).jpg',
    credit: { institution: 'United States Senate', creator: 'Cornelia Adèle Strong Fassett' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'electoral-count-1877',
      mediaKind: 'document',
      title: 'The electoral count of 1877',
      date: { d: '1877' },
      url: 'https://archive.org/download/electoralcountof00cong/electoralcountof00cong.pdf',
      page: 'https://archive.org/details/electoralcountof00cong',
      credit: {
        institution: 'The Library of Congress (Internet Archive)',
        creator: 'Abraham B. Conger'
      },
      license: { id: 'public-domain' },
      bytes: 4271095
    }
  ]
})
