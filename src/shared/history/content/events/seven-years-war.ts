import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'seven-years-war',
  names: [
    { text: 'Seven Years’ War', lang: 'en', role: 'primary' },
    {
      text: 'French and Indian War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-french-indian-war',
          loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1756-08-29' },
        cites: [
          {
            source: 'britannica-1911-seven-years-war',
            loc: { section: 'Seven Years\' War', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1763' },
        cites: [
          {
            source: 'britannica-1911-seven-years-war',
            loc: { section: 'Seven Years\' War', para: '1' }
          },
          {
            source: 'state-dept-milestones-french-indian-war',
            loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'north-america', 'south-asia', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      ref: 'place:quebec-city',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '30' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:russian-empire',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'prussia',
      name: 'Prussia',
      polity: 'polity:kingdom-of-prussia',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      polity: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      key: 'coalition',
      name: 'Austria, Russia, Sweden and Saxony',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:frederick-the-great',
      role: 'leader',
      side: 'prussia',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      name: 'William Pitt the Elder',
      role: 'head-of-government',
      side: 'britain',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '30' }
        }
      ]
    },
    {
      name: 'Robert Clive',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-paris-1763',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    },
    {
      ref: 'event:battle-of-plassey',
      rel: 'related',
      cites: [
        {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '1' }
        }
      ]
    },
    {
      ref: 'event:american-revolutionary-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-french-indian-war',
          loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '1' }
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
          text: 'The French and Indian War was the North American conflict in a larger imperial war between Great Britain and France known as the Seven Years’ War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-indian-war',
            loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/french-indian-war'
          }
        },
        {
          id: 'q2',
          text: 'Prussia was joined by England, and between England and France, as usual, a maritime and colonial war broke out at the first pretext; this war laid the foundations of the British empire, for ere the seven campaigns had been fought in Europe, the French dominion in Canada and the French influence in India, in spite of Dupleix, Lally and Montcalm, had been entirely overthrown by the victories of Clive, Amherst and Wolfe.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-seven-years-war',
            loc: { section: 'Seven Years\' War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The French and Indian War resulted from ongoing frontier tensions in North America as both French and British imperial officials and colonists sought to extend each country’s sphere of influence in frontier regions.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-indian-war',
            loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/french-indian-war'
          }
        },
        {
          id: 'q4',
          text: 'The border between French and British possessions was not well defined, and one disputed territory was the upper Ohio River valley.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-indian-war',
            loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/french-indian-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Prussia had maintained all her possessions and made good her claim to rank for all time with the Great Powers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-seven-years-war',
            loc: { section: 'Seven Years\' War', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
          }
        },
        {
          id: 'q6',
          text: 'Unfortunately for the British, the fruits of victory brought seeds of trouble with Great Britain’s American colonies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-indian-war',
            loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/french-indian-war'
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
            value: { d: '1756-08-29' },
            cites: [
              {
                source: 'britannica-1911-seven-years-war',
                loc: { section: 'Seven Years\' War', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On the 29th of August 1756 the Saxon frontier was crossed; Dresden was occupied on the 10th of September, the Saxon army, about 14,000 strong, falling back before the invaders to the entrenched camp of Pirna, an almost inaccessible plateau parallel to the Elbe and close to the Bohemian frontier.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1757-11-05' },
            cites: [
              { source: 'britannica-1911-rossbach', loc: { section: 'Rossbach', para: '1' } },
              { source: 'britannica-1911-leuthen', loc: { section: 'Leuthen', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In November 1757, however, when Europe looked upon him as ruined, he rid himself of the French by his splendid victory over them at Rossbach, and in about a month afterwards, by the still more splendid victory at Leuthen, he drove the Austrians from Silesia.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-frederick-ii-of-prussia',
          loc: { section: 'Frederick II. of Prussia', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Frederick_II._of_Prussia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1759' },
            cites: [
              {
                source: 'state-dept-milestones-french-indian-war',
                loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'British forces defeated French forces in India, and in 1759 British armies invaded and conquered Canada.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-indian-war',
          loc: { section: 'French and Indian War/Seven Years’ War, 1754–63', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1750-1775/french-indian-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1762-01-05' },
            cites: [
              {
                source: 'britannica-1911-seven-years-war',
                loc: { section: 'Seven Years\' War', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 5th of January 1762 the tsarina died, and her successor, Peter III., at once offered peace.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1762-11-03' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1763',
                loc: { section: 'Treaty of Paris, 1763', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The diplomats completed their negotiations and signed the preliminary Treaty of Paris on November 3, 1762.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1763-02-15' },
            cites: [
              {
                source: 'britannica-1911-seven-years-war',
                loc: { section: 'Seven Years\' War', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Final terms of peace were adjusted on status quo ante basis at Hubertusburg on the 15th of February 1763.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-seven-years-war',
          loc: { section: 'Seven Years\' War', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/The_Death_of_General_Wolfe_by_Benjamin_West_-_Royal_Ontario_Museum_-_DSC00243.JPG/1280px-The_Death_of_General_Wolfe_by_Benjamin_West_-_Royal_Ontario_Museum_-_DSC00243.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:The_Death_of_General_Wolfe_by_Benjamin_West_-_Royal_Ontario_Museum_-_DSC00243.JPG',
    credit: { institution: 'Royal Ontario Museum', creator: 'Benjamin West' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'anderson-2000-crucible-of-war', perspective: 'american' }
  ]
})
