import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'haymarket-affair',
  names: [
    { text: 'Haymarket affair', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1886-05-04' },
        cites: [
          {
            source: 'loc-guide-haymarket-affair',
            loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
          },
          {
            source: 'loc-guide-haymarket-affair',
            loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
          },
          {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:chicago',
      cites: [
        {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:second-international', rel: 'related' }
  ],
  participants: [
    {
      name: 'August Spies',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        }
      ]
    },
    {
      name: 'Albert Parsons',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        }
      ]
    },
    {
      name: 'Capt. John Bonfield',
      role: 'commander',
      cites: [
        {
          source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
          loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
        }
      ]
    },
    {
      name: 'John Peter Altgeld',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 800, max: 1000 },
            cites: [
              {
                source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
                loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1886, a national strike for 8-hour workdays led to clashes, deaths, and a bomb in Haymarket Square, Chicago.',
          lang: 'en',
          cite: {
            source: 'loc-guide-haymarket-affair',
            loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
          }
        },
        {
          id: 'q2',
          text: 'On May 4, 1886, a bomb detonates near Haymarket Square in Chicago after police arrive to break up a rally in support of striking workers. This protest is one of a number of strikes, demonstrations, and other events held by workers and their supporters in Chicago from May 1-4 to advocate for an eight hour workday. Many police officers and protesters are wounded or killed by the blast, and ultimately 8 individuals are arrested, tried, and convicted in relation to the bombing.',
          lang: 'en',
          cite: {
            source: 'loc-guide-haymarket-affair',
            loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In den USA beginnt ein mehrtätiger Generalstreik für die Einführung des Achtstundentages. Während des Ausstands, an dem rund 350.000 Arbeiter teilnehmen, kommt es zu blutigen Auseinandersetzungen mit der Polizei.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1886.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The meeting was orderly and attended by the mayor, who remained until the crowd began to disperse, and then went away.',
          lang: 'en',
          cite: {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Altgeld%27s_Reasons_for_Pardoning_Fielden,_Neebe_and_Schwab'
          }
        },
        {
          id: 'q5',
          text: 'The prosecution could not discover who had thrown the bomb and could not bring the really guilty man to justice,',
          lang: 'en',
          cite: {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Altgeld%27s_Reasons_for_Pardoning_Fielden,_Neebe_and_Schwab'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The public was greatly excited, and after a prolonged trial all the defendants were found guilty;',
          lang: 'en',
          cite: {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Altgeld%27s_Reasons_for_Pardoning_Fielden,_Neebe_and_Schwab'
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
            value: { d: '1886-05-01' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              },
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              },
              { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '26' } },
              { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '27' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Industrial workers across the U.S. go on strike, demanding an 8-hour workday.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1886-05-03' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'During a strike at McCormick Reaper Works in Chicago, demonstrators clash with police, and several of the strikers are wounded or killed.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1886-05-04' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'One police officer is killed by the blast, and several men, both strikers and police officers, die or are wounded in the ensuing violence.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1886-05-27' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Thirty-one men are indicted and 8 men—Albert Parsons, August Spies, Oscar Neebe, Louis Lingg, George Engel, Adolph Fischer, Michael Schwab, Samuel Fielden—are arrested and charged as accessories to murder.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1886-08-19' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              },
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On August 19th, the men are found guilty, and seven are sentenced to death by hanging. The eighth man, Oscar Neebe is given a lighter sentence of 15 years in the penitentiary.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1887-11-10' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Louis Lingg commits suicide in prison.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1887-11-11' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Parsons, Spies, Engel, and Fischer are executed. Their funeral is witnessed by over 150,000 people.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1893-06-26' },
            cites: [
              {
                source: 'loc-guide-haymarket-affair',
                loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Illinois governor John Peter Altgeld pardons Neebe, Fielden, and Schwab.',
        lang: 'en',
        cite: {
          source: 'loc-guide-haymarket-affair',
          loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/The_Anarchist_Riot_in_Chicago_-_A_Dynamite_Bomb_exploding_among_the_police_%28McCormick_Strike%2C_Haymarket_Square%29_LCCN99614182.jpg/1280px-The_Anarchist_Riot_in_Chicago_-_A_Dynamite_Bomb_exploding_among_the_police_%28McCormick_Strike%2C_Haymarket_Square%29_LCCN99614182.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Anarchist_Riot_in_Chicago_-_A_Dynamite_Bomb_exploding_among_the_police_(McCormick_Strike,_Haymarket_Square)_LCCN99614182.jpg',
    credit: { institution: 'Library of Congress', creator: 'Thure de Thulstrup' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'altgeld-reasons-for-pardoning-1893',
      mediaKind: 'document',
      title: 'Reasons for pardoning Fielden, Neebe and Schwab',
      date: { d: '1893' },
      url: 'https://archive.org/download/reasonsforpardon00altg/reasonsforpardon00altg.pdf',
      page: 'https://archive.org/details/reasonsforpardon00altg',
      credit: {
        institution: 'University of Illinois Urbana-Champaign (Internet Archive)',
        creator: 'John Peter Altgeld'
      },
      license: { id: 'public-domain' },
      bytes: 2809013
    }
  ]
})
