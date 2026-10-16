import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'voyages-of-columbus',
  names: [
    { text: 'Voyages of Columbus', lang: 'en', role: 'primary' },
    {
      text: 'Columbian voyages',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1492-08-03' },
        cites: [
          {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '11' }
          },
          {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1504-11-07' },
        cites: [
          {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '25' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:palos',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '10' }
        },
        { source: 'fordham-columbus-journal-1492', loc: { section: 'Extracts from Journal' } }
      ]
    },
    {
      ref: 'place:cadiz',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '23' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:spanish-empire',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:christopher-columbus',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '11' }
        }
      ]
    },
    {
      ref: 'person:isabella-i-of-castile',
      role: 'organizer',
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '2' }
        }
      ]
    },
    {
      ref: 'person:ferdinand-ii-of-aragon',
      role: 'organizer',
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '2' }
        }
      ]
    },
    {
      name: 'Martin Alonso Pinzon',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '10' }
        }
      ]
    },
    {
      name: 'Vicente Yañez Pinzon',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '10' }
        }
      ]
    },
    {
      name: 'Rodrigo de Triana',
      role: 'witness',
      cites: [
        {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '11' }
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
            value: { min: 88 },
            cites: [
              {
                source: 'britannica-1911-columbus-christopher',
                loc: { section: 'Columbus, Christopher', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-tordesillas',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
        }
      ]
    },
    {
      ref: 'event:fall-of-granada',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
        }
      ]
    },
    {
      ref: 'event:alhambra-decree',
      rel: 'related',
      cites: [
        { source: 'fordham-columbus-journal-1492', loc: { section: 'Extracts from Journal' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When Christopher Columbus arrived on the Bahamian Island of Guanahani (San Salvador) in 1492, he encountered the Taíno people, whom he described in letters as "naked as the day they were born."',
          lang: 'en',
          cite: {
            source: 'loc-early-americas-columbus-and-the-taino',
            loc: { section: 'Columbus and the Taíno', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/exploring-the-early-americas/columbus-and-the-taino.html'
          }
        },
        {
          id: 'q2',
          text: 'Columbus\' enterprise to find a westward route to Asia grew out of the practical experience of a long and varied maritime career, as well as out of his considerable reading in geographical and theological literature.',
          lang: 'en',
          cite: {
            source: 'loc-1492-christopher-columbus',
            loc: { section: 'Christopher Columbus: Man and Myth', para: '2' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'European exploration in the 15th and 16th centuries drew on many sources.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        },
        {
          id: 'q4',
          text: 'Christopher Columbus went to sea on the crest of these maritime advances.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        },
        {
          id: 'q5',
          text: 'He believed the world to be a sphere; he underestimated its size; he overestimated the size of the Asiatic continent.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '3' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'On the 6th of September they weighed anchor once more with all haste, Columbus having been informed that three Portuguese caravels were on the look-out to intercept him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q7',
          text: 'The land sighted was an island, called by the Indians Guanahani, and named by Columbus San Salvador.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '11' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Europeans brought technologies, ideas, plants, and animals that were new to America and would transform peoples\' lives: guns, iron tools, and weapons; Christianity and Roman law; sugarcane and wheat; horses and cattle.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        },
        {
          id: 'q9',
          text: 'The Spaniards settled first on the island of Hispaniola and later moved on to Cuba, Puerto Rico, and Jamaica, forcing the Taínos to mine for gold.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        },
        {
          id: 'q10',
          text: 'As mining decreased, the Spanish introduced livestock, crops, and fruit trees.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        },
        {
          id: 'q11',
          text: 'In the exploration and exploitation of the New World, Spain found an outlet for the crusading energies that the war against the Muslims had stimulated.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q12',
          text: 'So after having expelled the Jews from your dominions, your Highnesses, in the same month of January, ordered me to proceed with a sufficient armament to the said regions of India, and for that purpose granted me great favors, and ennobled me that thenceforth I might call myself Don, and be High Admiral of the Sea, and perpetual Viceroy and Governor in all the islands and continents which I might discover and acquire',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
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
            value: { d: '1492-08-03' },
            cites: [
              {
                source: 'britannica-1911-columbus-christopher',
                loc: { section: 'Columbus, Christopher', para: '11' }
              },
              {
                source: 'fordham-columbus-journal-1492',
                loc: { section: 'Extracts from Journal' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The adventurers numbered 88-souls; and on Friday, the 3rd of August 1492, at eight in the morning, the little fleet weighed anchor, and stood for the Canary Islands.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1492-10-12' },
            cites: [
              {
                source: 'britannica-1911-columbus-christopher',
                loc: { section: 'Columbus, Christopher', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Columbus himself perceived and pointed out a light ahead, and at two in the morning of Friday, the 12th of October 1492, Rodrigo de Triana, a sailor aboard the “Niña,” announced the appearance of what proved to be the New World.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1493-03-15' },
            cites: [
              {
                source: 'britannica-1911-columbus-christopher',
                loc: { section: 'Columbus, Christopher', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On the 13th of March the “Niña” put out from the Tagus, and two days afterwards, Friday, the 15th of March, she reached Palos.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1493-09-24' },
            cites: [
              {
                source: 'britannica-1911-columbus-christopher',
                loc: { section: 'Columbus, Christopher', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'After several delays the fleet weighed anchor on the 24th of September 1493 and steered westwards.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-columbus-christopher',
          loc: { section: 'Columbus, Christopher', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Landing_of_Columbus_%282%29.jpg/1280px-Landing_of_Columbus_%282%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Landing_of_Columbus_(2).jpg',
    credit: { institution: 'Architect of the Capitol', creator: 'John Vanderlyn' },
    license: { id: 'public-domain' },
    title: 'Landing of Columbus'
  }
})
