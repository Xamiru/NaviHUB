import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-the-kingdom-of-italy',
  names: [
    { text: 'Proclamation of the Kingdom of Italy', lang: 'en', role: 'primary' },
    {
      text: 'Risorgimento',
      lang: 'it',
      role: 'alternative',
      cites: [
        {
          source: 'ehne-delpu-construction-of-nation-states-italy',
          loc: {
            section: 'The construction of nation states during the nineteenth century: the case of Italy',
            para: '5'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '8'
            }
          },
          {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:turin',
      cites: [
        {
          source: 'ehne-delpu-construction-of-nation-states-italy',
          loc: {
            section: 'The construction of nation states during the nineteenth century: the case of Italy',
            para: '9'
          }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-italy' }
  ],
  participants: [
    {
      name: 'Victor-Emmanuel II',
      role: 'head-of-state',
      cites: [
        {
          source: 'ehne-delpu-construction-of-nation-states-italy',
          loc: {
            section: 'The construction of nation states during the nineteenth century: the case of Italy',
            para: '7'
          }
        }
      ]
    },
    {
      name: 'Camillo Benso di Cavour',
      role: 'head-of-government',
      cites: [
        {
          source: 'ehne-delpu-construction-of-nation-states-italy',
          loc: {
            section: 'The construction of nation states during the nineteenth century: the case of Italy',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'person:giuseppe-garibaldi',
      role: 'commander',
      cites: [
        {
          source: 'ehne-delpu-construction-of-nation-states-italy',
          loc: {
            section: 'The construction of nation states during the nineteenth century: the case of Italy',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'person:napoleon-iii',
      role: 'participant',
      cites: [
        {
          source: 'ehne-anceau-napoleon-iii-and-europe',
          loc: { section: 'Napoleon III and Europe' }
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
          text: 'The formation of the modern Italian state began in 1861 with the unification of most of the peninsula under the House of Savoy (Piedmont-Sardinia) into the Kingdom of Italy.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/countries/italy' }
        },
        {
          id: 'q2',
          text: 'The construction of the Italian nation state was one of the primary national movements in Europe during the nineteenth century.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After the widespread failure of the revolutions of 1848, the movement for Italian independence was gradually harnessed by the Piedmontese monarchy around King Victor-Emmanuel II of Italy and his minister Cavour. They built, alongside the democratic path of national construction, a monarchical path based on political and economic liberalism.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        },
        {
          id: 'q4',
          text: 'The Italian ambitions of the Piedmont were presented in the form of a territorial project, which would initially proceed by annexing Lombardy and the Kingdom of the Two Sicilies (1860), then Lombardy-Venezia (1866), and finally the Papal States in the aftermath of the capture of Rome (1870).',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The watchword attributed to the Piedmontese patriot Massimo D’Azeglio in 1861—“We have made Italy. Now we must make Italians.”—explains the monarchy’s early implementation of a policy of nationalizing the masses.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        },
        {
          id: 'q5',
          text: 'However, increasingly radical opposition to the new nation state appeared in the wake of the proclamation of the kingdom of Italy in 1861.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        },
        {
          id: 'q7',
          text: 'However, these efforts to construct a truly unified Italian community were both the consequence and the limitation of the unfinished nature of national construction, of which the war waged by the bandits of the Mezzogiorno in the 1860s was one of the most significant episodes.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        },
        {
          id: 'q8',
          text: 'The difficulty in controlling the Italian territory in the face of such opposition, mostly located in the southern half of the peninsula, explains the gradual displacement of the kingdom’s capital, which was initially located in Turin (1860), and later in Florence (1865) and Rome (1870).',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
          }
        },
        {
          id: 'q9',
          text: 'The misfortune began in Italy, where he sent an expeditionary force that crushed revolutionaries threatening the Pope’s power and remained in place to protect Rome. In doing so, he who had been a hero in the eyes of patriots was henceforth seen as the primary obstacle to the country’s final unification.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'For that matter, like Garibaldi some democrats denounced the fact that the monarchy had twisted the national ambitions of patriots for its own benefit.',
          lang: 'en',
          cite: {
            source: 'ehne-delpu-construction-of-nation-states-italy',
            loc: {
              section: 'The construction of nation states during the nineteenth century: the case of Italy',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/construction-nation-states-during-nineteenth-century-case-italy'
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
            value: { d: '1861-04-11' },
            cites: [
              {
                source: 'state-dept-countries-italy',
                loc: {
                  section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The United States officially recognized the Kingdom of Italy when it accepted the credentials of Chevalier Joseph Bertinatti as Minister Plenipotentiary of the Kingdom of Italy on April 11, 1861.',
        lang: 'en',
        cite: {
          source: 'state-dept-countries-italy',
          loc: {
            section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
          }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/countries/italy' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/VictorEmmanuel2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:VictorEmmanuel2.jpg',
    credit: { creator: 'Eugène Disdéri' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'romeo-1969-cavour-e-il-suo-tempo', perspective: 'european' },
    { source: 'candeloro-1966-storia-dellitalia-moderna', perspective: 'european' }
  ]
})
