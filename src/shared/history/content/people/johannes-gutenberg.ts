import { definePerson } from '../../schema'

export default definePerson({
  id: 'johannes-gutenberg',
  names: [
    { text: 'Johannes Gutenberg', lang: 'en', role: 'primary' },
    {
      text: 'Johann Gutenberg',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-gutenberg-johann',
          loc: { section: 'Gutenberg, Johann', para: '1' }
        },
        {
          source: 'loc-name-authority-gutenberg-johann',
          loc: { section: 'MARC field 100 $d: heading dates' }
        }
      ]
    },
    {
      text: 'Johann Gensfleisch zur Laden zum Gutenberg',
      lang: 'de',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-gutenberg-johann',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1397', approx: true },
        cites: [
          {
            source: 'loc-name-authority-gutenberg-johann',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress name authority file' }
        ]
      },
      {
        value: { d: '1398', approx: true },
        cites: [
          {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1400' },
        cites: [
          {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          },
          {
            source: 'loc-bible-collection-the-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Bible Collection' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1468' },
        cites: [
          {
            source: 'loc-name-authority-gutenberg-johann',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          },
          {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '5' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:mainz',
    cites: [
      {
        source: 'britannica-1911-gutenberg-johann',
        loc: { section: 'Gutenberg, Johann', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:mainz',
    cites: [
      {
        source: 'britannica-1911-gutenberg-johann',
        loc: { section: 'Gutenberg, Johann', para: '5' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['businessperson', 'scientist'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Iean_Guttenberg%2C_Inventeur_-_de_l%27Imprimerie_%28BM_1879%2C1213.266%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iean_Guttenberg,_Inventeur_-_de_l%27Imprimerie_(BM_1879,1213.266).jpg',
    credit: { institution: 'British Museum' },
    license: { id: 'public-domain' },
    title: 'Iean Guttenberg, Inventeur - de l\'Imprimerie'
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Johann Gutenberg, who lived from about 1400 to about 1468, is generally credited for inventing the process of making uniform and interchangeable metal types and for solving the many problems of finding the right materials and methods for printing.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-the-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html'
          }
        },
        {
          id: 'q2',
          text: 'In spite of the detailed and minute levels of research lavished on the Gutenberg Bible, very little is known about Johann Gutenberg (1400–1468).',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'On January 16, 1430, his mother arranged with the city of Mainz about an annuity belonging to him; but when, in the same year, some families who had been expelled a few years before were permitted to return to Mainz, Gutenberg appears not to have availed himself of the privilege, as he is described in the act of reconciliation (dated March 28) as “not being in Mainz.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1441 Gutenberg became surety to the St Thomas Chapter at Strassburg for Johann Karle, who borrowed 100 guilders (about £16) from the chapter, and on November 17, 1442, he himself borrowed 80 livres through Martin Brechter (or Brehter) from the same chapter.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        },
        {
          id: 'q5',
          text: 'We have no Information as to Gutenberg’s activity, and very little of his whereabouts, after his separation from Fust.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        },
        {
          id: 'q6',
          text: 'In a document dated June 21, 1457, he appears as witness on behalf of one of his relatives, which shows that he was then still at Mainz.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'On the 17th of January 1465 he accepted the post of salaried courtier from the archbishop Adolf, and in this capacity received annually a suit of livery together with a fixed allowance of corn and wine.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Gutenberg seems to have died at Mainz at the beginning of 1468, and was, according to tradition, buried in the Franciscan church in that city.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'On the 24th of June 1900 the five-hundredth anniversary of Gutenberg’s birth was celebrated in several German cities, notably in Mainz and Leipzig, and most of the recent literature on the invention of printing dates from that time.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    }
  ]
})
