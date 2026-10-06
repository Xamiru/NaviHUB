import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'franco-prussian-war',
  names: [
    { text: 'Franco-Prussian War', lang: 'en', role: 'primary' },
    { text: 'Deutsch-Französischer Krieg', lang: 'de', role: 'alternative' },
    { text: 'Guerre franco-allemande de 1870', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-06',
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
  sides: [
    {
      key: 'france',
      name: 'Frankreich',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '28' } }
      ]
    },
    {
      key: 'germany',
      name: 'Preußen',
      cites: [
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
          id: 'q1',
          text: 'Die vom preußischen Ministerpräsidenten Otto von Bismarck nachhaltig geförderte Kandidatur des Erbprinzen Leopold aus der Sigmaringer Hohenzollern-Linie für den vakanten spanischen Königsthron veranlasst die französische Regierung zu einer Kriegsdrohung für den Fall, dass Leopold seine Kandidatur nicht zurückziehe.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
          }
        },
        {
          id: 'q2',
          text: 'Der französische Botschafter verlangt von König Wilhelm I. in Bad Ems die Zusicherung, auch künftig keine Kandidatur eines Hohenzollern für die spanische Krone zuzulassen. Der König lehnt ab und berichtet telegraphisch Bismarck. Dieser gibt noch am selben Tag die von ihm gekürzte "Emser Depesche" mit den französischen Forderungen an die Presse weiter.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Nationalistic fervor was ignited by the promised annexation of Lorraine and Alsace, which had belonged to the Holy Roman Empire and had been seized by France in the seventeenth century. With this goal in sight, the south German states eagerly joined in the war against the country that had come to be seen as Germany\'s traditional enemy.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
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
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '27' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Frankreich erklärt Preußen den Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1870-09-01', notAfter: '1870-09-02' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '35' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Schlacht bei Sedan: Kapitulation der französischen Armee unter Marschall McMahon (1808-1893) und Gefangennahme Kaiser Napoleons III.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '36' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
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
        id: 'q9',
        text: 'Die französische Hauptstadt Paris wird von deutschen Truppen eingeschlossen und belagert.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '40' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-01-28' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '8' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Nach viermonatiger Belagerung kapituliert die französische Hauptstadt Paris vor den deutschen Truppen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '9' } },
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
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '35' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Der Friedensvertrag von Frankfurt/Main verpflichtet Frankreich zur Abtretung des Elsass ohne Belfort und Nordlothringens mit der Festung Metz sowie zur Zahlung von fünf Milliarden Francs Reparationen an Deutschland.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '36' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG/1280px-1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:1877_Camphausen_Otto_von_Bismarck_geleitet_Kaiser_Napoleon_III_anagoria.JPG',
    credit: { institution: 'Deutsches Historisches Museum', creator: 'Wilhelm Camphausen' },
    license: { id: 'public-domain' }
  }
})
