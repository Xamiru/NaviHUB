import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-granada',
  names: [
    { text: 'Fall of Granada', lang: 'en', role: 'primary' },
    {
      text: 'Conquest of Granada',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1491' },
        cites: [
          { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } },
          {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1492-01-02' },
        cites: [
          {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '7' }
          },
          {
            source: 'britannica-1911-alhambra-the',
            loc: { section: 'Alhambra, The', para: '4' }
          },
          {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1492-01-07' },
        cites: [
          {
            source: 'marcus-1938-the-expulsion-from-spain-1492',
            loc: { section: 'The Expulsion from Spain, 1492 CE', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'participant', name: 'Anonymous Italian Jew (Hebrew account of 1495)' }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:granada',
      cites: [
        {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '7' }
        },
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:emirate-of-granada',
      cites: [
        {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'castile-aragon',
      name: 'Castile and Aragon',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '4' }
        }
      ]
    },
    {
      key: 'granada',
      name: 'Granada',
      polity: 'polity:emirate-of-granada',
      cites: [
        {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ferdinand-ii-of-aragon',
      role: 'leader',
      side: 'castile-aragon',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '4' }
        }
      ]
    },
    {
      ref: 'person:isabella-i-of-castile',
      role: 'leader',
      side: 'castile-aragon',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '4' }
        }
      ]
    },
    {
      name: 'Boabdil',
      role: 'leader',
      side: 'granada',
      cites: [
        { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:alhambra-decree',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-1492-mediterranean-world',
          loc: { section: 'The Mediterranean World', para: '7' }
        }
      ]
    },
    {
      ref: 'event:voyages-of-columbus',
      rel: 'related',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
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
          text: 'Ferdinand and Isabella resumed the Reconquest, dormant for more than 200 years, and in 1492 they captured Granada, earning for themselves the title of Catholic Kings.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q2',
          text: 'Al Ahmar and his successors ruled over Granada until 1492, in an unbroken line of twenty-five sovereigns who maintained their independence partly by force, and partly by payment of tribute to their stronger neighbours.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Granada_(city)'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'As the legitimacy of his alleged daughter Juana was disputed, his sister Isabella claimed the succession, and married her cousin, Ferdinand of Aragon, son of John I., in 1469 in defiance of her brother.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '664' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Boabdil soon after sought to gain prestige by invading Castile.',
          lang: 'en',
          cite: { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Boabdil'
          }
        },
        {
          id: 'q5',
          text: 'He was taken prisoner at Lucena in 1483, and only obtained his freedom by consenting to hold Granada as a tributary kingdom under Ferdinand and Isabella, king and queen of Castile and Aragon.',
          lang: 'en',
          cite: { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Boabdil'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The conquest of Granada allowed the Catholic Kings to divert their attention to exploration, although Christopher Columbus\'s first voyage in 1492 was financed by foreign bankers.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q7',
          text: 'Once Islamic Spain had ceased to exist, attention turned to the internal threat posed by hundreds of thousands of Muslims living in the recently incorporated Granada.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q8',
          text: 'Moriscos (Granadan Muslims) were given the choice of voluntary exile or conversion to Christianity.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q9',
          text: 'The spot from which Boabdil looked for the last time on Granada is still shown, and is known as “the last sigh of the Moor” (el ultimo suspiro del Moro).',
          lang: 'en',
          cite: { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Boabdil'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q10',
          text: 'Whereas, Most Christian, High, Excellent, and Powerful Princes, King and Queen of Spain and of the Islands of the Sea, our Sovereigns, this present year 1492, after your Highnesses had terminated the war with the Moors reigning in Europe, the same having been brought to an end in the great city of Granada, where on the second day of January, this present year, I saw the royal banners of your Highnesses planted by force of arms upon the towers of the Alhambra, which is the fortress of that city, and saw the Moorish king come out at the gate of the city and kiss the hands of your Highnesses, and of the Prince my Sovereign;',
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
            value: { d: '1482' },
            cites: [
              {
                source: 'britannica-1911-granada-city',
                loc: { section: 'Granada (city)', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1482 Boabdil succeeded in deposing his father, who fled to Malaga',
        lang: 'en',
        cite: {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Granada_(city)'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1491' },
            cites: [
              { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1491 Boabdil was summoned by Ferdinand and Isabella to surrender the city of Granada, and on his refusal it was besieged by the Castilians.',
        lang: 'en',
        cite: { source: 'britannica-1911-boabdil', loc: { section: 'Boabdil', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Boabdil'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1492-01-02' },
            cites: [
              {
                source: 'britannica-1911-alhambra-the',
                loc: { section: 'Alhambra, The', para: '4' }
              },
              {
                source: 'britannica-1911-granada-city',
                loc: { section: 'Granada (city)', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On its watch-tower, the Torre de la Vela, 85 ft. high, the flag of Ferdinand and Isabella was first raised, in token of the Spanish conquest of Granada, on the 2nd of January 1492.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-alhambra-the',
          loc: { section: 'Alhambra, The', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alhambra,_The'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/La_Rendici%C3%B3n_de_Granada_-_Pradilla.jpg/1280px-La_Rendici%C3%B3n_de_Granada_-_Pradilla.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:La_Rendici%C3%B3n_de_Granada_-_Pradilla.jpg',
    credit: { creator: 'Francisco Pradilla y Ortiz' },
    license: { id: 'public-domain' }
  }
})
