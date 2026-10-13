import { definePerson } from '../../schema'

export default definePerson({
  id: 'louis-xvi',
  names: [
    { text: 'Louis XVI', lang: 'en', role: 'primary' },
    { text: 'Louis XVI de France', lang: 'fr', role: 'native' },
    { text: 'Louis Capet', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1754-08-23' },
        cites: [
          {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1793-01-21' },
        cites: [
          {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:versailles',
    cites: [
      {
        source: 'britannica-1911-louis-xvi-of-france',
        loc: { section: 'Louis XVI. of France', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:paris',
    cites: [
      {
        source: 'britannica-1911-french-revolution',
        loc: { section: 'French Revolution, The', para: '53' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'king of France',
      polity: 'polity:kingdom-of-france',
      start: {
        alts: [
          {
            value: { d: '1774-05-10' },
            cites: [
              {
                source: 'britannica-1911-louis-xvi-of-france',
                loc: { section: 'Louis XVI. of France', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1792-09-21' },
            cites: [
              {
                source: 'britannica-1911-louis-xvi-of-france',
                loc: { section: 'Louis XVI. of France', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-louis-xvi-of-france',
          loc: { section: 'Louis XVI. of France', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Portret_van_Lodewijk_XVI%2C_koning_van_Frankrijk_Rijksmuseum_SK-A-3278.jpeg/1280px-Portret_van_Lodewijk_XVI%2C_koning_van_Frankrijk_Rijksmuseum_SK-A-3278.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Portret_van_Lodewijk_XVI,_koning_van_Frankrijk_Rijksmuseum_SK-A-3278.jpeg',
    credit: { institution: 'Rijksmuseum', creator: 'After Joseph-Siffred Duplessis' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'LOUIS XVI. (1754–1793), king of France, was the son of Louis, dauphin of France, the son of Louis XV., and of Marie Joseph of Saxony, and was born at Versailles on the 23rd of August 1754, being baptized as Louis Augustus.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Louis XVI. was twenty years of age.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '366' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q3',
          text: 'He was just twenty years old when the death of Louis XV. on the 10th of May 1774 placed him on the throne.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        },
        {
          id: 'q4',
          text: 'He began his reign under good auspices, with Turgot, the greatest living French statesman, in charge of the disorganized finances; but in less than two years he had yielded to the demand of the vested interests attacked by Turgot’s reforms, and dismissed him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        },
        {
          id: 'q5',
          text: 'When he swore to maintain the constitution, then in progress of construction, at the festival of the federation on the 14th of July 1790, he was at the height of his popularity.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        },
        {
          id: 'q6',
          text: 'Arrested at Varennes, and brought back to Paris, he was maintained as a constitutional king, and took his oath on the 13th of September 1791.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'On the 21st of September 1792 the Convention declared royalty abolished, and in January it tried the king for his treason against the nation, and condemned him to death.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        },
        {
          id: 'q8',
          text: 'He was executed on the 21st of January 1793.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        },
        {
          id: 'q9',
          text: 'His courage and dignity during his trial and on the scaffold has left him a better reputation than he deserves.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        }
      ]
    }
  ]
})
