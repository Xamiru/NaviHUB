import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'industrial-revolution',
  names: [
    { text: 'Industrial Revolution', lang: 'en', role: 'primary' },
    {
      text: 'industrial revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-labour-legislation',
          loc: { section: 'Labour Legislation', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1775', notAfter: '1800' },
        cites: [
          {
            source: 'catholic-encyclopedia-1913-labour-and-labour-legislation',
            loc: { section: 'Labour and Labour Legislation', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-cotton-manufacture',
          loc: { section: 'Cotton Manufacture', para: '58' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James Watt',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-watt-james', loc: { section: 'Watt, James', para: '8' } }
      ]
    },
    {
      name: 'Richard Arkwright',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-cotton-manufacture',
          loc: { section: 'Cotton Manufacture', para: '60' }
        }
      ]
    },
    {
      name: 'Matthew Boulton',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-watt-james', loc: { section: 'Watt, James', para: '8' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The modern industrial era, the factory system, the age of machine production, began, properly speaking, with the industrial revolution. The latter phrase describes that series of changes which was effected by several notable inventions, chiefly the steam-engine, spinning machinery, and the power-loom, during the last quarter of the eighteenth century.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-1913-labour-and-labour-legislation',
            loc: { section: 'Labour and Labour Legislation', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/Labour_and_Labour_Legislation'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'First emphasis must be laid upon the point that it was not mechanical change alone which constituted the industrial revolution.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cotton-manufacture',
            loc: { section: 'Cotton Manufacture', para: '58' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cotton_Manufacture'
          }
        },
        {
          id: 'q3',
          text: 'The spirit of the times was centralizing management before any mechanical changes of a revolutionizing character had been devised.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cotton-manufacture',
            loc: { section: 'Cotton Manufacture', para: '58' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cotton_Manufacture'
          }
        },
        {
          id: 'q4',
          text: 'Great changes, no doubt, would soon have swept over Lancashire had a new source of power and big factories not been rendered essential by inventions in spinning.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cotton-manufacture',
            loc: { section: 'Cotton Manufacture', para: '58' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cotton_Manufacture'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Among their most important immediate results were: the grouping of workingmen into factories where they tended machines instead of working in their homes with the old and simple tools; the ownership of the factories and machinery by capitalist employers, instead of by the labourers themselves; a great increase in the dependence of the labourer upon the employer; and congestion of the working population in the cities which grew up close to the factories and commercial establishments.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-1913-labour-and-labour-legislation',
            loc: { section: 'Labour and Labour Legislation', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/Labour_and_Labour_Legislation'
          }
        },
        {
          id: 'q6',
          text: 'The distress inevitable in connexion with such an industrial revolution was increased by the immense burden of the war and by the high protective policy of the parliament, which restricted trade and deliberately increased the price of food in the interests of the agricultural classes.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-english-history',
            loc: { section: 'English History', para: '611' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/English_History'
          }
        },
        {
          id: 'q7',
          text: 'Between 1811 and 1814 bands of so-called “Luddites,” starving operatives out of work, scoured the country, smashing machinery—the immediate cause of their misfortunes—and committing every sort of outrage.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-english-history',
            loc: { section: 'English History', para: '611' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/English_History'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1768' },
            cites: [
              {
                source: 'britannica-1911-watt-james',
                loc: { section: 'Watt, James', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1768 Watt had made the acquaintance of Matthew Boulton, a man of energy and capital, who owned the Soho engineering works at Birmingham.',
        lang: 'en',
        cite: { source: 'britannica-1911-watt-james', loc: { section: 'Watt, James', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Watt,_James'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1771' },
            cites: [
              {
                source: 'britannica-1911-cotton-manufacture',
                loc: { section: 'Cotton Manufacture', para: '60' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'He began work with his first partners at Nottingham (when power was derived from horses) and started at Cromford in 1771 (where the force of water was used).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cotton-manufacture',
          loc: { section: 'Cotton Manufacture', para: '60' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cotton_Manufacture'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1775' },
            cites: [
              {
                source: 'britannica-1911-watt-james',
                loc: { section: 'Watt, James', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1775 an act was passed continuing the patent for twenty-five years.',
        lang: 'en',
        cite: { source: 'britannica-1911-watt-james', loc: { section: 'Watt, James', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Watt,_James'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1779', approx: true },
            cites: [
              {
                source: 'britannica-1911-cotton-manufacture',
                loc: { section: 'Cotton Manufacture', para: '94' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Crompton’s mule, which combined the principles of the rollers and the jenny, was perfected about 1779.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cotton-manufacture',
          loc: { section: 'Cotton Manufacture', para: '94' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cotton_Manufacture'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1783' },
            cites: [
              {
                source: 'britannica-1911-watt-james',
                loc: { section: 'Watt, James', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'By 1783 all but one of the Newcomen pumping-engines in Cornwall had been displaced by Watt\'s.',
        lang: 'en',
        cite: { source: 'britannica-1911-watt-james', loc: { section: 'Watt, James', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Watt,_James'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Joseph_Wright_of_Derby_%281734-1797%29_-_An_Iron_Forge_-_T06670_-_Tate.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_(1734-1797)_-_An_Iron_Forge_-_T06670_-_Tate.jpg',
    credit: { institution: 'Tate', creator: 'Joseph Wright of Derby' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'mantoux-1906-la-revolution-industrielle-au-xviiie-siecle',
      perspective: 'european'
    }
  ],
  places: [
    {
      ref: 'place:manchester',
      cites: [
        {
          source: 'britannica-1911-cotton-manufacture',
          loc: { section: 'Cotton Manufacture', para: '2' }
        }
      ]
    }
  ]
})
