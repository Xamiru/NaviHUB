import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-tordesillas',
  names: [
    { text: 'Treaty of Tordesillas', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1494-06-07' },
        cites: [
          {
            source: 'avalon-treaty-of-tordesillas-1494',
            loc: {
              section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
            }
          },
          { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1494-09-05' },
        cites: [
          {
            source: 'avalon-treaty-of-tordesillas-1494',
            loc: {
              section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:tordesillas',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        },
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:portuguese-empire',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    },
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
  sides: [
    {
      key: 'castile-aragon',
      name: 'Castile and Aragon',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    },
    {
      key: 'portugal',
      name: 'Portugal',
      polity: 'polity:portuguese-empire',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ferdinand-ii-of-aragon',
      role: 'signatory',
      side: 'castile-aragon',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    },
    {
      ref: 'person:isabella-i-of-castile',
      role: 'signatory',
      side: 'castile-aragon',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    },
    {
      name: 'John II of Portugal',
      role: 'signatory',
      side: 'portugal',
      cites: [
        {
          source: 'avalon-treaty-of-tordesillas-1494',
          loc: {
            section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:voyages-of-columbus',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
        }
      ]
    },
    {
      ref: 'event:voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Treaty of Tordesillas, which Spain and Portugal signed one year later, moved the line of division westward and allowed Portugal to claim Brazil.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Isabella\'s niece, Juana, had bloodily disputed her succession to the throne in a conflict in which the rival claimants were given assistance by outside powers--Isabella by Aragon and Juana by her suitor, the king of Portugal.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q3',
          text: 'Portuguese exploration and trade along the West African coast and the Atlantic islands, encouraged and directed by Prince Henry de Avis, the Navigator, continued throughout the 15th century.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        },
        {
          id: 'q4',
          text: 'In the fifteenth century, Portuguese mariners were opening a route around Africa to the East.',
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In 1493, when Columbus brought 1,500 colonists with him on his second voyage, a royal administrator had already been appointed for the Indies.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q6',
          text: 'This was accomplished by the treaty of Tordesillas (June 7, 1494) which modified the delimitation authorized by Pope Alexander VI. in two bulls issued on the 4th of May, 1493.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'On its provisions were based both the Portuguese claim to Brazil and the Spanish claim to the Moluccas',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '80' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        },
        {
          id: 'q8',
          text: 'From 1499 to 1580 Portugal acquired an empire stretching from Brazil eastward to the Moluccas, reached the zenith of its prosperity and entered upon a period of swift decline.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '51' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q9',
          text: 'That, whereas a certain controversy exists between the said lords, their constituents, as to what lands, of all those discovered in the ocean sea up to the present day, the date of this treaty, pertain to each one of the said parts respectively; therefore, for the sake of peace and concord, and for the preservation of the relationship and love of the said King of Portugal for the said King and Queen of Castile, Aragon, etc., it being the pleasure of their Highnesses, they, their said representatives, acting in their name and by virtue of their powers herein described, covenanted and agreed that a boundary or straight line be determined and drawn north and south, from pole to pole, on the said ocean sea, from the Arctic to the Antarctic pole.',
          lang: 'en',
          cite: {
            source: 'avalon-treaty-of-tordesillas-1494',
            loc: {
              section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://avalon.law.yale.edu/15th_century/mod001.asp'
          }
        },
        {
          id: 'q10',
          text: 'This boundary or line shall be drawn straight, as aforesaid, at a distance of three hundred and seventy leagues west of the Cape Verde Islands, being calculated by degrees, or by any other manner as may be considered the best and readiest, provided the distance shall be no greater than abovesaid.',
          lang: 'en',
          cite: {
            source: 'avalon-treaty-of-tordesillas-1494',
            loc: {
              section: 'Treaty between Spain and Portugal concluded at Tordesillas; June 7, 1494'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://avalon.law.yale.edu/15th_century/mod001.asp'
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
            value: { d: '1493' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE GOLDEN AGE', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1493 Pope Alexander VI (Rodrigo Borgia, a Catalan) formally approved the division of the unexplored world between Spain and Portugal.',
        lang: 'en',
        cite: {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1494' },
            cites: [
              { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '673' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The voyage of Columbus had unforeseen consequences which led to diplomatic difficulties with Portugal, and the treaty of Tordesillas in 1494, which defined the respective spheres of influence of the two powers in the New World and in Asia.',
        lang: 'en',
        cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '673' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Early_Tordesillas_lines.jpg/1280px-Early_Tordesillas_lines.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Early_Tordesillas_lines.jpg',
    credit: {
      creator: 'Henry Harrisse',
      institution: 'The Diplomatic History of America: Its First Chapter (1897)'
    },
    license: { id: 'public-domain' }
  }
})
