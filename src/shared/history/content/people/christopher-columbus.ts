import { definePerson } from '../../schema'

export default definePerson({
  id: 'christopher-columbus',
  names: [
    { text: 'Christopher Columbus', lang: 'en', role: 'primary' },
    {
      text: 'Cristóbal Colón',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '1' }
        }
      ]
    },
    { text: 'Cristoforo Colombo', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1451', approx: true },
        cites: [
          {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '1' }
          }
        ]
      },
      {
        value: { d: '1446', approx: true },
        cites: [
          {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '1' }
          }
        ]
      },
      {
        value: { d: '1450', approx: true },
        cites: [
          {
            source: 'loc-name-authority-columbus-christopher',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Bibliothèque nationale de France catalogue, as cited in the Library of Congress record'
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1506-05-20' },
        cites: [
          {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '26' }
          },
          {
            source: 'loc-name-authority-columbus-christopher',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:genoa',
    cites: [
      {
        source: 'britannica-1911-columbus-christopher',
        loc: { section: 'Columbus, Christopher', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:valladolid',
    cites: [
      {
        source: 'britannica-1911-columbus-christopher',
        loc: { section: 'Columbus, Christopher', para: '26' }
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  roles: ['military', 'other'],
  offices: [
    {
      title: 'Admiral of the Ocean Sea',
      polity: 'polity:spanish-empire',
      start: {
        alts: [
          {
            value: { d: '1492' },
            cites: [
              {
                source: 'loc-1492-christopher-columbus',
                loc: { section: 'Christopher Columbus: Man and Myth', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '3' }
        },
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg/1280px-Portrait_of_a_Man%2C_Said_to_be_Christopher_Columbus.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_a_Man,_Said_to_be_Christopher_Columbus.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Sebastiano del Piombo' },
    license: { id: 'public-domain' },
    title: 'Portrait of a Man, Said to be Christopher Columbus'
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Queen Isabel and King Fernando had agreed to Columbus\' lavish demands if he succeeded on his first voyage: he would be knighted, appointed Admiral of the Ocean Sea, made the viceroy of any new lands, and awarded ten percent of any new wealth.',
          lang: 'en',
          cite: {
            source: 'loc-1492-christopher-columbus',
            loc: { section: 'Christopher Columbus: Man and Myth', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/columbus.html'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'COLUMBUS, CHRISTOPHER [in Spanish Cristobal Colón] (c. 1446, or perhaps rather 1451,–1506) was the eldest son of Domenico Colombo and Suzanna Fontanarossa, and was born at Genoa either about 1446 or in 1451, the exact date being uncertain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q3',
          text: 'Upon discovering this treachery, Columbus left Lisbon for Spain (1484), taking with him his son Diego, the only issue of his marriage with Felipa Moñiz, who was by this time dead.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1487 Columbus, who had been following the court from place to place (billeted in towns as an officer of the sovereigns, and gratified from time to time with sums of money towards his expenses), was present at the siege of Malaga.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q5',
          text: 'Columbus decided to return home; he appointed his brother Bartholomew adelantado of the island; and on the 10th of March 1496 he quitted Hispaniola in the “Niña.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q6',
          text: 'After a tempestuous voyage he landed once more at San Lucar on the 7th of November 1504.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'By 1502, however, Columbus had every reason to fear for the security of his position. He had been charged with maladministration in the Indies.',
          lang: 'en',
          cite: {
            source: 'loc-1492-christopher-columbus',
            loc: { section: 'Christopher Columbus: Man and Myth', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/columbus.html'
          }
        },
        {
          id: 'q8',
          text: 'But intrigue and his own administrative failings brought disappointment and political obscurity to his final years.',
          lang: 'en',
          cite: {
            source: 'loc-1492-christopher-columbus',
            loc: { section: 'Christopher Columbus: Man and Myth', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/columbus.html'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'The last documentary note of him is contained in a final codicil to the will of 1498, made at Valladolid on the 19th of May 1506.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q10',
          text: 'Next day (20th of May 1506) he died.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q11',
          text: 'After the funeral ceremonies at Valladolid, Columbus’s remains were transferred to the Carthusian monastery of Santa Maria de las Cuevas, Seville, where the bones of his son Diego, the second admiral, were also laid.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q12',
          text: 'In 1795–1796, on the cession of that island to the French, the relics were re-exhumed and transferred to the cathedral of Havana, whence, after the Spanish-American War of 1898 and the loss of Cuba, they were finally removed to Seville cathedral, where they remain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q13',
          text: 'There I found very many islands, filled with innumerable people, and I have taken possession of them all for their Highnesses, done by proclamation and with the royal standard unfurled, and no opposition was offered to me.',
          lang: 'en',
          cite: {
            source: 'loc-early-americas-columbus-and-the-taino',
            loc: { section: 'Columbus and the Taíno', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino.html'
          }
        }
      ]
    }
  ]
})
