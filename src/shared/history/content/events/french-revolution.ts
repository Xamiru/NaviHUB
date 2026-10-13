import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-revolution',
  names: [
    { text: 'French Revolution', lang: 'en', role: 'primary' },
    {
      text: 'the Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1789-05-05' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1799-11-09' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '97' }
          },
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '501' }
          },
          {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '12' }
        }
      ]
    },
    {
      ref: 'place:versailles',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:louis-xvi',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '2' }
        }
      ]
    },
    {
      ref: 'person:maximilien-robespierre',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '64' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 17000, qualifier: 'about' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '73' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:storming-of-the-bastille',
      rel: 'contributed-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '13' }
        }
      ]
    },
    {
      ref: 'event:declaration-of-the-rights-of-man',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
          loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
        }
      ]
    },
    {
      ref: 'event:execution-of-louis-xvi',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '53' }
        }
      ]
    },
    {
      ref: 'event:coup-of-18-brumaire',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '1' }
        }
      ]
    },
    {
      ref: 'event:haitian-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '1' }
        }
      ]
    },
    {
      ref: 'event:american-revolutionary-war',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '3' }
        }
      ]
    },
    {
      ref: 'period:reign-of-terror',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '63' }
        }
      ]
    },
    {
      ref: 'period:napoleonic-wars',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The French Revolution lasted from 1789 until 1799.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/french-rev'
          }
        },
        {
          id: 'q2',
          text: 'Among the many revolutions which from time to time have given a new direction to the political development of nations the French Revolution stands out as at once the most dramatic in its incidents and the most momentous in its results.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The failure of the harvest of 1788 and a severe winter had caused widespread distress.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q4',
          text: 'The government was weak and despised, and its agents were afraid or unwilling to quell outbreaks of disorder.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'If we view the work of the National Assembly as a whole, we are struck by the immense demolition which it effected.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q6',
          text: 'Uniformity of laws and institutions was enforced throughout France.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '99' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q7',
          text: 'The Revolution precipitated a series of European wars, forcing the United States to articulate a clear policy of neutrality in order to avoid being embroiled in these European conflicts.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/french-rev'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'In a period of fifteen months, it has been calculated, about 17,000 persons had been executed in France under form of law.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q9',
          text: 'The number of those who were shot, drowned or otherwise massacred without the pretence of a trial can never be accurately known, but must be reckoned far greater.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
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
            value: { d: '1789-05-05' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 5th of May the states-general were opened by Louis in the Salle des Menus Plaisirs at Versailles.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1789-06-20' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '5' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '386' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '389' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the 20th Bailly and the deputies proceeded to the hall and found it barred against their entrance.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1789-07-14' },
            cites: [
              { source: 'britannica-1911-bastille', loc: { section: 'Bastille', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'At the breaking out of the Revolution the Bastille was attacked by the Parisians; and, after a vigorous resistance, it was taken and razed to the ground on the 14th of July 1789.',
        lang: 'en',
        cite: { source: 'britannica-1911-bastille', loc: { section: 'Bastille', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bastille'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1789-08-04' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '15' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '391' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '389' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Disorder in the provinces led directly to the proceedings on the famous night of the 4th of August.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1789-10-05' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '19' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '393' }
              },
              {
                source: 'britannica-1911-louis-xvi-of-france',
                loc: { section: 'Louis XVI. of France', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On the 5th of October a mob which had gathered to assault the Hôtel de Ville was diverted into a march on Versailles.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1791-06-20' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Finally the king and queen resolved to fly to the army of the East, which the marquis de Bouillé had in some measure kept under discipline. Sheltered by him they could await foreign succour or a reaction at home. On the evening of the 20th of June they escaped from the Tuileries.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1792-04-20' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '40' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '39' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The king bent to necessity, and on the 20th of April came to the Assembly with the proposal that war should be declared against Austria.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1792-08-10' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '46' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '398' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On the night of the 9th a new revolutionary Commune took possession of the hôtel de ville, and early on the morning of the 10th the insurgents assailed the Tuileries.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '46' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1793-01-21' },
            cites: [
              {
                source: 'state-dept-milestones-french-revolution',
                loc: {
                  section: 'The United States and the French Revolution, 1789–1799',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'After French King Louis XVI was tried and executed on January 21, 1793, war between France and monarchal nations Great Britain and Spain was inevitable.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1784-1800/french-rev'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1794-07-27' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '72' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Such was the revolution of the 9th Thermidor (27th of July 1794) which ended the Reign of Terror.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '72' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1799-11-09' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '97' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '501' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On the morning of the 18th Brumaire (November 9) the Ancients, to whom that power belonged, decreed the transference of the councils to St Cloud.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Prise_de_la_Bastille.jpg/1280px-Prise_de_la_Bastille.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Prise_de_la_Bastille.jpg',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)', creator: 'Jean-Pierre Houël' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'soboul-1984-la-revolution-francaise', perspective: 'european' },
    { source: 'furet-1983-penser-la-revolution-francaise', perspective: 'european' }
  ]
})
