import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'franco-prussian-war',
  names: [
    { text: 'Franco-Prussian War', lang: 'en', role: 'primary' },
    { text: 'Deutsch-Französischer Krieg', lang: 'de', role: 'alternative' },
    { text: 'Guerre franco-allemande de 1870', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1870-07-19' },
        cites: [
          { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '27' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1871-05-10' },
        cites: [
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '35' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:sedan',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '36' } }
      ]
    },
    {
      ref: 'place:paris',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '40' } }
      ]
    },
    {
      ref: 'place:versailles',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:german-empire' }
  ],
  sides: [
    {
      key: 'france',
      name: 'France',
      polity: 'polity:second-french-empire',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Final Defeat in Germany and Reconciliation with Prussia', para: '2' }
        },
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '28' } }
      ]
    },
    {
      key: 'germany',
      name: 'Prussia',
      polity: 'polity:kingdom-of-prussia',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Final Defeat in Germany and Reconciliation with Prussia', para: '2' }
        },
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '28' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'organizer',
      side: 'germany',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '5' }
        }
      ]
    },
    {
      ref: 'person:wilhelm-i',
      role: 'commander',
      side: 'germany',
      cites: [
        { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
      ]
    },
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'france',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '36' } }
      ]
    },
    {
      name: 'Marschall McMahon',
      role: 'commander',
      side: 'france',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '36' } }
      ]
    },
    {
      name: 'Léon Gambetta',
      role: 'leader',
      side: 'france',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '38' } }
      ]
    },
    {
      ref: 'person:adolphe-thiers',
      role: 'negotiator',
      side: 'france',
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:proclamation-of-the-german-empire',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '5' }
        }
      ]
    },
    { ref: 'event:paris-commune', rel: 'related' },
    {
      ref: 'event:capture-of-rome',
      rel: 'related',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '33' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q13',
          text: 'The desired pretext was offered on the 3rd of July 1870 by the candidature of a Hohenzollern prince for the throne of Spain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '531' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q14',
          text: 'The ill-advised action of Gramont in demanding from King William one of those promises for the future which are humiliating but never binding, gave Bismarck his opportunity, and the king’s refusal was transformed by him into an insult by the “editing” of the Ems telegram.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '533' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The conflict would become known to history as the Franco-Prussian War. Nationalistic fervor was ignited by the promised annexation of Lorraine and Alsace, which had belonged to the Holy Roman Empire and had been seized by France in the seventeenth century. With this goal in sight, the south German states eagerly joined in the war against the country that had come to be seen as Germany\'s traditional enemy.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Believing that France would remain Germany\'s enemy because of the annexation of Alsace-Lorraine, an action he had opposed because of the enmity it would cause, he turned to other states.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        },
        {
          id: 'q5',
          text: 'The indemnity that France had to pay Germany after losing the 1870-71 war provided capital for railroad construction and building projects.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Economy and Population Growth', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/30.htm' }
        },
        {
          id: 'q6',
          text: 'Nach vorzeitiger Zahlung der Reparationen aus dem Deutsch-Französischen Krieg verlassen die letzten deutschen Truppen französisches Territorium.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1873', loc: { section: 'Chronik 1873', para: '41' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1873.html'
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
            value: { d: '1870-07-19' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '27' } },
              {
                source: 'loc-austria-country-study-1994',
                loc: {
                  section: 'The Final Defeat in Germany and Reconciliation with Prussia',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'France declared war on Prussia and invaded German territory in July 1870.',
        lang: 'en',
        cite: {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Final Defeat in Germany and Reconciliation with Prussia', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1870-09-01', notAfter: '1870-09-02' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '35' } },
              { source: 'britannica-1911-sedan', loc: { section: 'SEDAN', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The battle of Sedan was closed about 4.15 P.M. by the hoisting of the white flag. Terms were agreed upon during the night, and the whole French army, with the emperor, passed into captivity.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-franco-german-war',
          loc: { section: 'FRANCO-GERMAN WAR', para: '140' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Franco-German_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1870-09-18' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '39' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The two sieges of Paris in 1870-71 are among the most dramatic episodes of its history. The first siege began on the 19th of September 1870, with the occupation by the Germans of the heights on the left side of the river and the capture of the unfinished redoubt of Châtillon. Two days later the investment was complete.',
        lang: 'en',
        cite: { source: 'britannica-1911-paris', loc: { section: 'PARIS', para: '368' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paris'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-01-28' },
            cites: [
              { source: 'britannica-1911-paris', loc: { section: 'PARIS', para: '368' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'An armistice was signed on the 27th of January, the capitulation on the 28th.',
        lang: 'en',
        cite: { source: 'britannica-1911-paris', loc: { section: 'PARIS', para: '368' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paris'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-02-26' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '17' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Der Vorfriede von Versailles beendet die Kampfhandlungen im Deutsch-Französischen Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '18' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-05-10' },
            cites: [
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '538' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The same day the preliminaries of peace were signed at Versailles, which, confirmed by the treaty of Frankfort of the 10th of May, transferred from France to Germany the whole of Alsace, excepting Belfort, and a large portion of Lorraine, including Metz, with a money indemnity of two hundred millions sterling.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-france-history',
          loc: { section: 'FRANCE: History', para: '538' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG/1280px-1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG',
    credit: { institution: 'Deutsches Historisches Museum', creator: 'Wilhelm Camphausen' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'roth-1990-la-guerre-de-1870', perspective: 'european' },
    { source: 'bremm-2019-70-71', perspective: 'european' }
  ]
})
