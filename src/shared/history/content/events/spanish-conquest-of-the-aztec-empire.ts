import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'spanish-conquest-of-the-aztec-empire',
  names: [
    { text: 'Spanish conquest of the Aztec Empire', lang: 'en', role: 'primary' },
    {
      text: 'Conquest of Mexico',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '322' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1519-03' },
        cites: [
          {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '2' }
          },
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1521-08' },
        cites: [
          {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:tenochtitlan',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    },
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:spanish-empire',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:aztec-empire',
      cites: [
        { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } }
      ]
    }
  ],
  sides: [
    {
      key: 'spanish',
      name: 'Spanish expedition and its native allies',
      polity: 'polity:spanish-empire',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '1' }
        }
      ]
    },
    {
      key: 'aztec',
      name: 'Aztec',
      polity: 'polity:aztec-empire',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:hernan-cortes',
      role: 'leader',
      side: 'spanish',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '1' }
        }
      ]
    },
    {
      ref: 'person:moctezuma-ii',
      role: 'head-of-state',
      side: 'aztec',
      cites: [
        {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '2' }
        }
      ]
    },
    {
      ref: 'person:cuauhtemoc',
      role: 'leader',
      side: 'aztec',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        }
      ]
    },
    {
      name: 'Tlaxcalan allies',
      role: 'combatant',
      side: 'spanish',
      cites: [
        {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '2' }
        }
      ]
    },
    {
      name: 'Narváez',
      role: 'commander',
      side: 'spanish',
      cites: [
        {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '3' }
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
          text: 'Lured by stories of the riches of the Aztec, a Spanish adventurer, Hernán (sometimes referred to as Fernando or Hernando) Cortés, assembled a fleet of eleven ships, ammunition, and over 700 men and in 1519 set sail from Cuba to Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q2',
          text: 'The party landed near present-day Veracruz in eastern Mexico and started its march inland.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'About 1430 took place the triple alliance of the Acolhua, Aztec and Tepanec kings, whose capitals were Tezcuco, Mexico and Tlacopan, the latter standing much below the other two.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        },
        {
          id: 'q4',
          text: 'About 1325 they founded on the lake of Tezcuco the permanent settlement of Mexico Tenochtitlan, which is still represented by the capital city, Mexico.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '292' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The republic of Tlaxcala, which was hostile to Montezuma, opposed him; but he routed its army, which had resisted all the forces of the Mexican empire, dictated peace on moderate terms and converted the people into powerful auxiliaries.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        },
        {
          id: 'q6',
          text: 'His farther advance was in vain attempted to be checked by an ambuscade laid by the inhabitants of Cholula, on whom he took signal vengeance.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        },
        {
          id: 'q7',
          text: 'The Spanish recruited new troops while a smallpox epidemic raged through Tenochtitlán, killing much of the population, possibly including Montezuma.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'After the fall of Tenochtitlán, the Spaniards\' task was to settle and expand the new domains on the mainland of North and Central America that became known as New Spain.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q9',
          text: 'As a symbol of political continuity, the capital of the new colony was to be built squarely atop the ruins of Tenochtitlán and was renamed Mexico after the Mexica tribe.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q10',
          text: 'In the nineteenth century, the legend of Cuauhtémoc would be revived, and the last Aztec emperor would be considered a symbol of honor and courage, the first Mexican national hero.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1519' },
            cites: [
              {
                source: 'britannica-1911-cortes-hernan',
                loc: { section: 'Cortes, Hernan', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'He laid the foundation of the town of Vera Cruz, caused himself to be elected captain-general of the new colony, and burned his vessels to cut off the possibility of retreat and show his soldiers that they must either conquer or perish.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1519-11' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Spanish Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Montezuma soon was arrested, and the Spanish took control of Tenochtitlán.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1520' },
            cites: [
              {
                source: 'britannica-1911-cortes-hernan',
                loc: { section: 'Cortes, Hernan', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Montezuma perished in attempting to address his revolted subjects; the latter, having chosen a new emperor, attacked the headquarters of Cortes with the utmost fury, and, in spite of the advantage of firearms, forced the Spaniards to retire, as the only means of escaping destruction.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1521' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Spanish Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'By the summer of 1521, the Spanish were ready to assault the city.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Spanish Conquest', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1521-08' },
            cites: [
              {
                source: 'britannica-1911-cortes-hernan',
                loc: { section: 'Cortes, Hernan', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Immediately afterwards he proceeded to Tlaxcala, assembled an auxiliary army of natives, subjected the neighbouring provinces, and then marched a second time against Mexico, which, after a gallant defence of several months, was retaken on the 13th of August 1521.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-cortes-hernan',
          loc: { section: 'Cortes, Hernan', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Lienzo_de_Tlaxcala_-_Hern%C3%A1n_Cort%C3%A9s_introduciendo_el_cristianismo.jpg/1280px-Lienzo_de_Tlaxcala_-_Hern%C3%A1n_Cort%C3%A9s_introduciendo_el_cristianismo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lienzo_de_Tlaxcala_-_Hern%C3%A1n_Cort%C3%A9s_introduciendo_el_cristianismo.jpg',
    credit: { creator: 'Manuel de Ylláñez' },
    license: { id: 'public-domain' }
  }
})
